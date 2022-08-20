//TODO: work in progress


import AsyncStorage from "@react-native-async-storage/async-storage";

export default  function generalfuntion(url, body, method) {
    fetch(global.url + url, {
        method: method,
        body: JSON.stringify(body), headers: {
            //Header Defination
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(response => {
                return response
            }
        ).catch(error => {
            console.log('ERROR:::::');
            console.log(error);
        });
}