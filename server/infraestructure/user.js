const _ = require("lodash");

module.exports = (driver) => ({
    save: (userData) => {
        const session = driver.session();
        //"CREATE (a:Person {name: $name}) RETURN a"
        let query = "CREATE (a:User {";

        const totalProps = Object.keys(userData).length;

        _.forEach(Object.keys(userData), (key, index) => {
            query += `${key}: $${key} ${(index == (totalProps - 1)) ? "" : ","}`;
        });

        query += "}) RETURN a";

        return session.run(query, userData).then((result) => {
            session.close();

            const singleRecord = result.records[0];
            const node = singleRecord.get(0);

            return node.properties;
        });
    }
});