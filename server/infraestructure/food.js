const Tools = require("../tools");

module.exports = (driver) => ({
    save: (foodData) => {
        const session = driver.session();
        //"CREATE (f:Food {name: $name}) RETURN f"
        const query = `CREATE (f:Food {${Tools.parseObjectPropertiesToQuery(foodData)}}) RETURN f`;

        return session.run(query, foodData).then((result) => {
            session.close();

            const singleRecord = result.records[0];
            const node = singleRecord.get(0);

            return node.properties;
        });
    },
    getByName: (name) => {
        const session = driver.session();
        let query = "MATCH (u:Food {search: $search}) RETURN u";

        return session.run(query, {search: name.toLowerCase()}).then(result => {
            session.close();

            if (!result) return false;
            else if (result.records.length == 0) return false;
            else {
                try {
                    const singleRecord = result.records[0];
                    const node = singleRecord.get(0);

                    return (node.properties.search == name.toLowerCase()) ? node.properties : false;
                } catch (e) {
                    Tools.err(`Error loading food for name ${name}`);
                    return false;
                }
            }
        });
    }
});