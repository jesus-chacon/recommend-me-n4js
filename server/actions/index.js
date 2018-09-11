const {userRepository, foodRepository} = require("../infraestructure");
const {userValidator, foodValidator} = require("../validators");
const {createUser, getUserByExternalId} = require("./User");
const {createFood} = require("./Food");

module.exports = {
    createUser: createUser({userRepository, userValidator}),
    getUserByExternalId: getUserByExternalId({userRepository}),

    createFood: createFood({foodRepository, foodValidator})
};