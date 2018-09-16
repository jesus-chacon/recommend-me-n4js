module.exports = ({userRepository, userValidator, foodRepository}) => async (externalId, foodName) => {
    const existUser = await userValidator.existId(externalId);

    if (!existUser) {
        throw new Error("User not found to relate");
    } else {
        await foodRepository.ensureFood(foodName);

        return userRepository.matchFood(externalId, foodName);
    }
};