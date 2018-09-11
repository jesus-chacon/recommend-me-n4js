module.exports = ({userRepository}) => ({
    existId: async (externalId) => {
        const user = await userRepository.getByExternalId(externalId);

        return !!user;
    }
});