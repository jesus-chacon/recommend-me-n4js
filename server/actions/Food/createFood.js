module.exports = ({foodRepository, foodValidator}) => async (foodData) => {
    const exist = await foodValidator.exist(foodData.name);

    if (!exist) {
        foodData.search = foodData.name.toLowerCase();

        return foodRepository.save(foodData);
    } else {
        return foodRepository.getByName(foodData.name);
    }
};