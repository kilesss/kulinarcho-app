//TODO: work in progress


import AsyncStorage from "@react-native-async-storage/async-storage";
import endpoints from "./endpoints/endpoints";

const login = async function (body, method) {
    const res = await fetch(endpoints.login, {
    method: method,
    body: JSON.stringify(body),
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

const getShopingList = async function (method, JWT) {
    const res = await fetch(endpoints.getShopingList, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + JWT
    }
    });
  
  return await res.json();
}

export { login, forgotenPassword, signup, getShopingList }



