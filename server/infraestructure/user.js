const Tools = require("../tools");

module.exports = (driver) => ({
    save: (userData) => {
        const session = driver.session();
        //"CREATE (a:Person {name: $name}) RETURN a"
        const query = `CREATE (u:User {${Tools.parseObjectPropertiesToQuery(userData)}}) RETURN u`;

        return session.run(query, userData).then((result) => {
            session.close();

            const singleRecord = result.records[0];
            const node = singleRecord.get(0);

            return node.properties;
        });
    },
    getByExternalId: (externalId) => {

        return session.run(query, userData).then((result) => {
            session.close();

            const singleRecord = result.records[0];
            const node = singleRecord.get(0);

            return node.properties;
        });
    }
});