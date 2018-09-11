module.exports = ({foodRepository}) => ({
    exist: async (name) => {
        const food = await foodRepository.getByName(name);

        return !!food;
    }
});