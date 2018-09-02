const {userRepository} = require("../infraestructure");
const {userValidator} = require("../validators");

module.exports = {
    createUser: require("./createUser")({userRepository, userValidator})
};