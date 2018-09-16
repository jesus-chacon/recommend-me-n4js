module.exports = ({userRepository, foodRepository}) => async (externalId, foodName) => {
    await userRepository.ensureUser({externalId});
    await foodRepository.ensureFood(foodName);

    return userRepository.matchFood(externalId, foodName);
};