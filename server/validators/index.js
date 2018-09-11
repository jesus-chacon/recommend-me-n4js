const {userRepository, foodRepository} = require("../infraestructure");

module.exports = {
    userValidator: require("./user")({userRepository}),
    foodValidator: require("./food")({foodRepository})
};