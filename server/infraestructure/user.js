const Tools = require("../tools");

const save = (driver) => (userData) => {
    const session = driver.session();
    //"CREATE (a:Person {name: $name}) RETURN a"
    const query = `CREATE (u:User {${Tools.parseObjectPropertiesToQuery(userData)}}) RETURN u`;

    return session.run(query, userData).then((result) => {
        session.close();

        const singleRecord = result.records[0];
        const node = singleRecord.get(0);

        return node.properties;
    });
};

const getByExternalId = (driver) => (externalId) => {
    const session = driver.session();
    let query = "MATCH (u:User {externalId: $externalId}) RETURN u";

    return session.run(query, {externalId}).then(result => {
        session.close();

        if (!result) return false;
        else if (result.records.length == 0) return false;
        else {
            try {
                const singleRecord = result.records[0];
                const node = singleRecord.get(0);

                return (node.properties.externalId == externalId) ? node.properties : false;
            } catch (e) {
                Tools.err(`Error loading user with externalId ${externalId}`);
                return false;
            }
        }
    });
};

const matchFood = (driver) => (externalId, foodName) => {
    const session = driver.session();

    let query = `
        MATCH (u:User), (f:Food)
        WHERE u.externalId = $externalId AND f.search = $search
        CREATE (u)-[e:EAT]->(f)
        return e
    `;

    return session.run(query, {externalId, search: foodName.toLowerCase()}).then(result => {
        session.close();

        if (!result) return false;
        else if (result.records.length == 0) return false;
        else {
            try {

                console.log(result.records, result.records[0].get(0));
                const singleRecord = result.records[0];
                const node = singleRecord.get(0);

                return node.properties;
            } catch (e) {
                Tools.err(`Error loading user with externalId ${externalId}`);
                return false;
            }
        }
    });
};

module.exports = (driver) => ({
    save: save(driver),
    getByExternalId: getByExternalId(driver),
    matchFood: matchFood(driver)
});