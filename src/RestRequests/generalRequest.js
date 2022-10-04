//TODO: work in progress


import AsyncStorage from "@react-native-async-storage/async-storage";
import endpoints from "./endpoints/endpoints";

const login = async function (body, method) {
    const res = await fetch(endpoints.login, {
    method: method,
    body: body,
    headers: {
      'Content-Type': 'application/json',
    }
    });
  return await res.json();
}




const signup = async function (body, method) {
  const res = await fetch(endpoints.signup, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return res.json();
}

const forgotenPassword = async function (body, method) {
    const res = await fetch(endpoints.forgotenPassword, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    }
    });

  return await res.json();
}

export const updateList = async function (body, token) {
    const res = await fetch(endpoints.updateList, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}
export const deleteList = async function (body, token) {
    const res = await fetch(endpoints.deleteList, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}
const getShopingList = async function (method, JWT) {
    const res = await fetch(endpoints.getShopingList, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + JWT
    }
    });
  return formatResponse2(await res.json());
}

const getWeeklyMenus = async function (method, JWT) {
    const res = await fetch(endpoints.getWeeklyMenus, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}

const getSingleWeeklyMenu = async function (method, JWT, id) {
    const res = await fetch(`${endpoints.getSingleWeeklyMenu}${id}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}

const getSingleRecipe = async function (method, JWT, id) {
    const res = await fetch(`${endpoints.getSingleRecipe}${id}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}

const getCategories = async function (method, JWT) {
    const res = await fetch(`${endpoints.getCategories}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}

const getProductTypes = async function (method, JWT) {
    const res = await fetch(`${endpoints.getProductTypes}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}

const getProducts = async function (method, JWT) {
    const res = await fetch(`${endpoints.getProducts}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });

    return formatResponse(await res.json());
}


const getSingleProfile = async function (method, JWT, id) {
    const res = await fetch(`${endpoints.getPublicProfile}${id}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}

const getPublicProfiles = async function (method, JWT) {
    const res = await fetch(`${endpoints.getPublicProfiles}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}

const getLatestRecipes = async function (method, JWT) {
    const res = await fetch(`${endpoints.getLatestRecipes}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}


const getPublicRecipes = async function (method, JWT, page = "", title="", category = 0, ownRecipe = 0) {
    let a = endpoints.getPublicRecipes + "?category="+ category +"&page=" + page
    console.log(a)
    const res = await fetch(`${endpoints.getPublicRecipes}?category=${category}&page=${page}&ownRecipe=${ownRecipe}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}

function formatResponse2(response) {
    if ('premium' in response){
        delete response.premium;
    }
    if ('user_requests' in response){
        delete response.user_requests;
    }
    if ('new_token' in response){
        AsyncStorage.setItem('access_token', response.new_token);
        delete response.new_token;
        delete response['new_token'];
    }

    return response;

}

function formatResponse(response) {
    if ('premium' in response){
        delete response.premium;
    }
    if ('first_login' in response){
        delete response.first_login
    }
    if ('user_requests' in response){
        delete response.user_requests;
    }
    if ('new_token' in response){
        AsyncStorage.setItem('access_token', response.new_token);
        delete response.new_token;
        delete response['new_token'];
    }

    return response;

}
const getShoppingListProducts = async function (listId, JWT) {
    const res = await fetch(endpoints.getShoppingListProducts+'?listId='+listId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}
const AddEditProductShoppingList = async function (body, token) {
    const res = await fetch(endpoints.AddEditProductShoppingList, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    return '';
}
const deleteProductFromList = async function (body, token) {
    const res = await fetch(endpoints.deleteProductFromList, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    return '';
}

const AddEditProductType = async function (body, token) {
    const res = await fetch(endpoints.addEditProductTypes, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    return '';
}

const deleteProductTypes = async function (body, token) {
    const res = await fetch(endpoints.deleteProductType, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

const addEditProduct = async function (body, token) {
    const res = await fetch(endpoints.addEditProduct, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    return '';
}

const deleteProduct = async function (body, token) {
    const res = await fetch(endpoints.deleteProduct, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}

const firstLogin = async function (token) {
    const res = await fetch(endpoints.firstLogin, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });
    return await res.json();
}


const addRecipe = async function (body, token) {
    const res = await fetch(endpoints.addRecipe, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });

    return await res.json();
}

const editRecipe = async function (body, token) {
    const res = await fetch(endpoints.editRecipe, {
        method: 'POST',
        body: body,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }
    });

    return await res.json();
}


const getUnits = async function (method, JWT) {
    const res = await fetch(`${endpoints.getUnits}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}

const getGroupInfo = async function (method, JWT) {
    const res = await fetch(`${endpoints.getGroupInfo}`, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + JWT
        }
    });
    return formatResponse(await res.json());
}



export {
    login, forgotenPassword, signup, getShopingList, getWeeklyMenus, getSingleWeeklyMenu,
    getSingleRecipe, getCategories, getProducts, getProductTypes, getSingleProfile,
    getPublicProfiles, getLatestRecipes, getPublicRecipes, getShoppingListProducts,
    AddEditProductShoppingList,deleteProductFromList, AddEditProductType, deleteProductTypes,
    addEditProduct, deleteProduct, firstLogin, addRecipe, getUnits, editRecipe, getGroupInfo
}



