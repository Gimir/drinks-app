export default {
    filters: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    drinks: category => `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
};