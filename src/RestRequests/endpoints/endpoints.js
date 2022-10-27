const host = 'https://kulinarcho.com/api/'
const endpoints = {

  login: host+'login',
  signup: host+'signup',
  forgotenPassword: host+'forgotenPassword',
  getShopingList: host+'shoppingList',
  updateList:host+'updateList',
  deleteList:host+'deleteList',
  getWeeklyMenus:host+'weekMenu',
  getSingleWeeklyMenu: host+'weekMenuID/?id=',
  getSingleRecipe: host+'showRecipe/?id=',
  getCategories: host+'getCategories',

  getProductTypes: host+'getTypes',
  getProducts: host+'getProducts',
  addEditProductTypes: host+'addProductType',
  deleteProductType: host+'deleteProductType',
  addEditProduct: host+'createProducts',
  deleteProduct: host+'deleteProducts',

  getPublicProfiles: host+'getPublicProfiles',
  getPublicProfile: host+'getPublicProfile/',

  getShoppingListProducts: host+'getShoppingListProducts/',
  addProductShoppingList: host+'AddProductShoppingList',

  getLatestRecipes: host+'latestRecipe/',
  getUserRecipes: host+'recipes/',
  getPublicRecipes: host+'getPublicRecipes',
  AddEditProductShoppingList: host+'AddEditProductShoppingList',
  deleteProductFromList: host+'deleteProductFromList',

  firstLogin: host+'firstLogin',

  addRecipe: host+'recipesAdd',
  editRecipe: host+'recipesEdit',
  getUnits: host+'getUnits',

  deleteRecipe: host+'recipesDelete',
  transferRecipe: host+'transferRecipe',
  setPublicRecipe: host+'setPublicRecipe',

  getGroupInfo: host+'profile',
  newRequest: host+'newRequest',
  deleteUserRequest: host+'deleteRequestUser',
  acceptUserRequest: host+'acceptRequestUser',
  deleteUserFromGroup: host+'deleteUser',
  getFollower: host+'getFollower',
  getRecipesProduct:host+'getRecipesProducts',
  submitWeekMenu:host+'submitWeekMenu',
  deleteWeekMenu:host+'deleteWeekMenu',
  addFollower: host+"addFollower",
}

export default endpoints;
