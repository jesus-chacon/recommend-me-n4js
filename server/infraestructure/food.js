const Tools = require("../tools");

const save = (driver) => (foodData) => {
    const session = driver.session();
    //"CREATE (f:Food {name: $name}) RETURN f"
    const query = `CREATE (f:Food {${Tools.parseObjectPropertiesToQuery(foodData)}}) RETURN f`;

    return session.run(query, foodData).then((result) => {
        session.close();

        const singleRecord = result.records[0];
        const node = singleRecord.get(0);

        return node.properties;
    });
};

const getByName = (driver) => (name) => {
    const session = driver.session();
    let query = "MATCH (u:Food {search: $search}) RETURN u";

    return session.run(query, { search: name.toLowerCase() }).then(result => {
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
};

const ensureFood = (driver) => async (name) => {
    const food = await getByName(driver)(name);

    if (!food) {
        const foodData = {
            name,
            search: name.toLowerCase()
        };

        return save(driver)(foodData);
    } else {
        return food;
    }
};

module.exports = (driver) => ({
    save: save(driver),
    getByName: getByName(driver),
    ensureFood: ensureFood(driver)
});