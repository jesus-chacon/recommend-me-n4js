const {userRepository, foodRepository} = require("../infraestructure");
const {userValidator, foodValidator} = require("../validators");
const {createUser, getUserByExternalId, eatFood} = require("./User");
const {createFood} = require("./Food");

module.exports = {
    createUser: createUser({userRepository, userValidator}),
    getUserByExternalId: getUserByExternalId({userRepository}),
    eatFood: eatFood({userRepository, userValidator, foodRepository}),

    createFood: createFood({foodRepository, foodValidator})
};