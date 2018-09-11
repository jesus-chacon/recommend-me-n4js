module.exports = ({userRepository}) => (externalId) => {
    return userRepository.getByExternalId(externalId);
};