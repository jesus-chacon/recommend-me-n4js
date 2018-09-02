module.exports = ({userRepository, userValidator}) => async (userData) => {
    const existUser = await userValidator.existId(userData.externalId);

    if (!existUser) {
        return userRepository.save(userData);
    } else {
        throw new Error("The user is now in the database");
    }
};