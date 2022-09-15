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
  return formatResponse(await res.json());
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
    console.log('await res.json()');
    console.log(await res);

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


function formatResponse(response) {
    if ('premium' in response){
        delete response.premium;
    }
    if ('first_login' in response){
        delete response.first_login;
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

export {
    login, forgotenPassword, signup, getShopingList, getWeeklyMenus, getSingleWeeklyMenu,
    getSingleRecipe, getCategories, getProducts, getProductTypes, getSingleProfile, getPublicProfiles,getShoppingListProducts
}



