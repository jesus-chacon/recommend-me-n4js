module.exports = (driver) => ({
    existId: (externalId) => {
        const session = driver.session();
        let query = "MATCH (u:User {externalId: $externalId}) RETURN u";

        return session.run(query, {externalId}).then(result => {
            session.close();

            if (!result) return false;
            else if (result.records.length == 0) return false;
            else {
                const singleRecord = result.records[0];
                const node = singleRecord.get(0);

                return !!node.properties && node.properties.externalId == externalId;
            }
        });
    }
});