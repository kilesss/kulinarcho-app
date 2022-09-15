import {FlatList, Image, SafeAreaView, Text, View} from "react-native";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton";
import {ShoppingListItem} from "../../components/shoppingList/ShoppingListItem";
import language from "../../language/language";
import * as React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {useEffect, useState} from "react";

import BottomPopup from "../../components/shoppingList/BottomPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getShoppingListProducts} from "../../RestRequests/generalRequest";
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
                        calculateFinalPrice();
                        // editShoppingLists(result)
                        // setShowLoader(false);
                    }

                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    const remove = (i) => {
        const arr = items.filter((item) => item.key !== i);
        editItems(arr);
    };


    const showEditProduct = (item, type) => {
        setBuyModalVisible(true)
        if (type === 'edit') {
            setModalData(item)
        } else {
            setModalData([])

        }
    };
    const checkStatus = (item) => {
        if (item === '0') {
            return false;
        }
        return true;
    }

    function calculateFinalPrice() {
        var finalPriceTemp = 0;
        Object.keys(items).forEach(function (key) {
            if (items[key].status === 1) {
                finalPriceTemp = items[key].finalPrice;
            }
        })
        setfinalPriceList(parseFloat(finalPriceTemp).toFixed(2))
    }

    function returnData(data) {
        if (data.newProductId.id !== undefined) {
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
        } else {
            Object.keys(items).forEach(function (key) {
                if (items[key].id === data.productId) {
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

        }
        //TODO send request
        setarticleCount(items.length)
        calculateFinalPrice();
        editItems(items);

    }

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
                                            finalPrice={item.finalPrice}
                                            description={item.description}
                                            productId={item.productId}
                                            price={item.price}
                                            num={item.value}
                                            checked={checkStatus(item.status)}
                                            onPressDelete={() => {
                                                remove(item.key)
                                            }}
                          />
                      )}/>
            {/*<BottomPopup modalVisible={addModalVisible}*/}
            {/*             setModalVisible={setAddModalVisible}*/}
            {/*             newProduct={true}*/}
            {/*             title={"addProduct"}*/}
            {/*             price={''}*/}
            {/*             amount={''}*/}
            {/*             finalPrice={0}*/}
            {/*/>*/}


            <BottomPopup modalVisible={buyModalVisible}
                         setModalVisible={setBuyModalVisible}
                         returnData={(data) => returnData(data)}
                         newProduct={modalData.id}
                         title={"buyProduct"}
                         price={modalData.price}
                         amount={modalData.value}
                         product={modalData.name}
                         finalPrice={modalData.finalPrice}
            />

        </SafeAreaView>

    );
}
