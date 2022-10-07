const endpoints = {
  login: 'https://kulinarcho.com/api/login',
  signup: 'https://kulinarcho.com/api/signup',
  forgotenPassword: 'https://kulinarcho.com/api/forgotenPassword',
  getShopingList: 'https://kulinarcho.com/api/shoppingList',
  updateList:'https://kulinarcho.com/api/updateList',
  deleteList:'https://kulinarcho.com/api/deleteList',
  getWeeklyMenus:'https://kulinarcho.com/api/weekMenu',
  getSingleWeeklyMenu: 'https://kulinarcho.com/api/weekMenuID/?id=',
  getSingleRecipe: 'https://kulinarcho.com/api/showRecipe/?id=',
  getCategories: 'https://kulinarcho.com/api/getCategories',

  getProductTypes: 'https://kulinarcho.com/api/getTypes',
  getProducts: 'https://kulinarcho.com/api/getProducts',
  addEditProductTypes: 'https:///kulinarcho.com/api/addProductType',
  deleteProductType: 'https:///kulinarcho.com/api/deleteProductType',
  addEditProduct: 'https:///kulinarcho.com/api/createProducts',
  deleteProduct: 'https:///kulinarcho.com/api/deleteProducts',

  getPublicProfiles: 'https://kulinarcho.com/api/getPublicProfiles',
  getPublicProfile: 'https://kulinarcho.com/api/getPublicProfile/',

  getShoppingListProducts: 'https://kulinarcho.com/api/getShoppingListProducts/',
  addProductShoppingList: 'https://kulinarcho.com/api/AddProductShoppingList',

  getLatestRecipes: 'https://kulinarcho.com/api/latestRecipe/',
  getPublicRecipes: 'https://kulinarcho.com/api/getPublicRecipes',
  AddEditProductShoppingList: 'https://kulinarcho.com/api/AddEditProductShoppingList',
  deleteProductFromList: 'https://kulinarcho.com/api/deleteProductFromList',

  firstLogin: 'https://kulinarcho.com/api/firstLogin',

  addRecipe: 'https://kulinarcho.com/api/recipesAdd',
  editRecipe: 'https://kulinarcho.com/api/recipesEdit',
  getUnits: 'https://kulinarcho.com/api/getUnits',

  getGroupInfo: 'https://kulinarcho.com/api/profile',
  newRequest: 'https://kulinarcho.com/api/newRequest',
  deleteUserRequest: 'https://kulinarcho.com/api/deleteRequestUser',
  acceptUserRequest: 'https://kulinarcho.com/api/acceptRequestUser',
  deleteUserFromGroup: 'https://kulinarcho.com/api/deleteUser',

}

export default endpoints;
