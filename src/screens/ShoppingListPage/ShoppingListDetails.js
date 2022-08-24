import {FlatList, Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton";
import {ShoppingListItem} from "../../components/display/ShoppingListItem";
import language from "../../language/language";
import {Ionicons} from "@expo/vector-icons";
import * as React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {useState} from "react";
import {BottomPopup} from "../../components/display/BottomPopup";


export default function ShoppingListDetails({route, navigation}) {

    const [items, editItems] = useState([
        { key: '1', title: "Яйца", num: "6", price: "2", checked: true},
        { key: '2', title: 'Мляко', num: "2", price: "1", checked: false},
        { key: '3', title: 'Брашно', num: "1", price: "3", checked: false},
        { key: '4', title: 'Хляб', num: "4", price: "5", checked: false},
        { key: '5', title: 'Тиква', num: "5", price: "7", checked: false},
        { key: '6', title: 'Праскова', num: "3", price: "4", checked: false},
        { key: '7', title: "Яйца", num: "2", price: "3", checked: false},
        { key: '8', title: 'Мляко', num: "2", price: "1", checked: false},
        { key: '9', title: 'Брашно', num: "1", price: "2", checked: false},
        { key: '10', title: 'Хляб', num: "5", price: "2", checked: false},
        { key: '11', title: 'Тиква', num: "7", price: "2", checked: false},
        { key: '12', title: 'Праскова', num: "1", price: "2", checked: false},
    ]);

    const remove = (i) => {
        const arr = items.filter((item) => item.key !== i);
        editItems(arr);
    };

    const add = (title, num, price) => {
        editItems((prevItems) => {
            return[
                {key: Math.random().toString(),
                    title: {title},
                    num: {num},
                    price: {price},
                    checked: false}
            ]
        })
    }

    const [modalData, setModalData] = useState([]);

    let addProductRef = React.createRef()
    let editProductRef = React.createRef()

    const showEditProduct = (item) => {
        editProductRef.show()
        setModalData(item)
    };

    const closeEditProduct = () => {
        editProductRef.close()
    }

    const showAddProduct = () => {
        addProductRef.show()
    };

    const closeAddProduct = () => {
        addProductRef.close()
    }
    return (

        <SafeAreaView style={[styles.container, {justifyContent: "flex-start"}]}>
            <View style={shoppingListStyle.summaryItems}>
                <View style={shoppingListStyle.totalItems}>
                    <Image source={require('../../../public/images/icons/shoppingList-selected.png')}/>
                    <Text style={{fontSize:18, fontWeight:"500"}}>
                        <Text style={{fontWeight: "600"}}>12</Text> артикула
                    </Text>
                </View>

                <View style={shoppingListStyle.totalPrice}>
                    <Image source={require('../../../public/images/icons/cash.png')} style={{width: 30, height: 25}}/>
                    <Text style={{fontSize:18, fontWeight:"500"}}>
                        <Text style={{fontWeight: "600"}}>78</Text> лв
                    </Text>
                </View>
            </View>

            <CustomButton title={language("addProduct")}
                          txtColor={"#fff"}
                          onPress={showAddProduct}
            />


            <FlatList data={items}
                      listHeaderComponent={<Text>aa</Text>}
                      style={{alignSelf:"stretch", marginTop:10}}
                      renderItem={({item}) => (
                          <ShoppingListItem onPress={() => { showEditProduct(item) }}
                                            title={item.title}
                                            price={item.price}
                                            num={item.num}
                                            checked={item.checked}
                                            onPressDelete={() => {remove(item.key)}}
                          />
                      )}/>

            <BottomPopup ref={(addProduct) => addProductRef = addProduct}
                         title={language("addProduct")}
                         onTouchOutside={closeAddProduct}
            />

            <BottomPopup ref={(editProduct) => editProductRef = editProduct}
                         title={language("buyProduct")}
                         product={modalData.title}
                         amount={modalData.num}
                         price={modalData.price}
                         onTouchOutside={closeEditProduct}
            />
        </SafeAreaView>

    );
}