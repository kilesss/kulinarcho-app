import {FlatList, Image, SafeAreaView, Text, View} from "react-native";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton";
import {ShoppingListItem} from "../../components/shoppingList/ShoppingListItem";
import language from "../../language/language";
import * as React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {useEffect, useRef, useState} from "react";

import BottomPopup from "../../components/shoppingList/BottomPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getShoppingListProducts,
    AddEditProductShoppingList,
    updateList,
    deleteProductFromList} from "../../RestRequests/generalRequest";
import {useRoute} from "@react-navigation/native";
import {finalize} from "@babel/core/lib/config/helpers/deep-array";


export default function ShoppingListDetails(props) {


    const [items, editItems] = useState([]);
    const [DemoToken, setDemoToken] = useState(true);
    const [articleCount, setarticleCount] = useState(0);
    const [finalPriceList, setfinalPriceList] = useState(0);

    const [modalData, setModalData] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState([]);
    const [buyModalVisible, setBuyModalVisible] = useState(false);


    useEffect(() => {
        loadData();

    }, []);

    function loadData() {

        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getShoppingListProducts(props.route.params.key, value).then(data => {
                    if (data) {
                        const result = Object.values(data);

                        editItems(result)
                        setarticleCount(result.length);
                        calculateFinalPrice(result);
                    }

                }).then(data=>{
                    console.log(data);
                    console.log('eeeeeeeeeeeee');


                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    const remove = (i) => {
        let newItemsList = [];
        Object.keys(items).forEach(function (key) {
            if (items[key].id !== i.id) {
                newItemsList.push(items[key])
            }
        })
        editItems(newItemsList);
        setarticleCount(newItemsList.length);
        calculateFinalPrice()
        deleteProductFromListRequest(i.id).then(r => {})
    };


    const showEditProduct = (item, type) => {
        buyProduct.current.open()
        if (type === 'edit') {
            setModalData(item)
        } else {
            setModalData([])

        }
    };
    const checkStatus = (item) => {
        if (item === 0) {
            return false;
        }
        return true;
    }

    function calculateFinalPrice(result = null) {
        var finalPriceTemp = 0;
        if (result === null){
            result = items;
        }

        Object.keys(result).forEach(function (key) {

            if (result[key].status === 1) {

                if (isNaN(result[key].finalPrice)){
                    result[key].finalPrice = 0
                }
                finalPriceTemp = finalPriceTemp + parseFloat(result[key].finalPrice);
            }
        })
        setfinalPriceList(parseFloat(finalPriceTemp).toFixed(2))
    }

    async function deleteProductFromListRequest(id){
        await deleteProductFromList(JSON.stringify({id: id}), DemoToken).then()
            .then(response => {
                if (response.errors) {
                    const restErr = JSON.stringify(response.errors);
                    //TODO: connect with error messages
                }
            })

    }
    async function AddEditProductShoppingListRequest(data) {


        var requestBody = {
            listId: props.route.params.key,
            ...data
        };
         await AddEditProductShoppingList(JSON.stringify(requestBody), DemoToken).then()
            .then(response => {
                if (response.errors) {
                    const restErr = JSON.stringify(response.errors);
                    //TODO: connect with error messages
                    console.log(restErr);
                }
            })

    }

    function returnData(data) {
        console.log(data);
        if (data.newProductId  !== null) {
            items.push({
                "description": '',
                "finalPrice": data.finalPrice,
                "id": '',
                "name": data.newProductId.title,
                "photo": null,
                "price": data.price,
                "productId": data.newProductId.id,
                "status": 0,
                "type": "",
                "value": data.amount,
            })
            AddEditProductShoppingListRequest(data).then(r =>{} )
        } else {
            let keyData = '';
            Object.keys(items).forEach(function (key) {
                if (items[key].id === data.productId) {
                    keyData = key;
                    if (items[key].status === 1){
                        items[key].status = 0;
                    }else {
                        items[key].status = 1;
                    }
                    items[key].price = data.price
                    items[key].value = data.amount
                    items[key].finalPrice = data.finalPrice
                }
            });
            AddEditProductShoppingListRequest(items[keyData]).then(r =>{} )

        }
        //TODO send request
        setarticleCount(items.length)
        calculateFinalPrice();
        editItems(items);

    }
    const buyProduct = useRef();


    return (

        <SafeAreaView style={[styles.container, {justifyContent: "flex-start"}]}>
            <View style={shoppingListStyle.summaryItems}>
                <View style={shoppingListStyle.totalItems}>
                    <Image source={require('../../../public/images/icons/shoppingList-selected.png')}/>
                    <Text style={{fontSize: 18, fontWeight: "500"}}>
                        <Text style={{fontWeight: "600"}}>{articleCount}</Text> артикула
                    </Text>
                </View>

                <View style={shoppingListStyle.totalPrice}>
                    <Image source={require('../../../public/images/icons/cash.png')} style={{width: 30, height: 25}}/>
                    <Text style={{fontSize: 18, fontWeight: "500"}}>
                        <Text style={{fontWeight: "600"}}>{finalPriceList}</Text> лв
                    </Text>
                </View>
            </View>

            <CustomButton title={language("addProduct")}
                          txtColor={"#fff"}
                          onPress={() => {
                              showEditProduct({}, 'add')
                          }}

            />


            <FlatList data={items}
                      listHeaderComponent={<Text>aa</Text>}
                      style={{alignSelf: "stretch", marginTop: 10}}
                      renderItem={({item}) => (
                          <ShoppingListItem onPress={() => {
                              showEditProduct(item, 'edit')
                          }}
                                            title={item.name}
                                            finalPrice={item.finalPrice === ''?0:item.finalPrice}
                                            description={item.description}
                                            productId={item.productId}
                                            price={item.price === ''?0:item.price}
                                            num={item.value === ''?0:item.value}
                                            checked={checkStatus(item.status)}
                                            onPressDelete={() => {
                                                remove(item)
                                            }}
                          />
                      )}/>


            <BottomPopup modalVisible={buyModalVisible}
                         setModalVisible={setBuyModalVisible}
                         returnData={(data) => returnData(data)}
                         newProduct={modalData.id}
                         title={"buyProduct"}
                         price={modalData.price}
                         amount={modalData.value}
                         product={modalData.name}
                         finalPrice={modalData.finalPrice}
                         buyProductRef={buyProduct}
            />

        </SafeAreaView>

    );
}
