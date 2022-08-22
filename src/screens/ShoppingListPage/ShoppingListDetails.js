import {FlatList, Image, Text, View} from "react-native";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton";
import {ShoppingListItem} from "../../components/display/ShoppingListItem";
import language from "../../language/language";
import {Ionicons} from "@expo/vector-icons";
import * as React from "react";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {useState} from "react";

export default function ShoppingListDetails({route, navigation}) {

    const [items, editItems] = useState([
        { key: '1', title: "Яйца", num: "6", price: "2"},
        { key: '2', title: 'Мляко', num: "6", price: "2"},
        { key: '3', title: 'Брашно', num: "6", price: "2"},
        { key: '4', title: 'Хляб', num: "6", price: "2"},
        { key: '5', title: 'Тиква', num: "6", price: "2"},
        { key: '6', title: 'Праскова', num: "6", price: "2"},
        { key: '7', title: "Яйца", num: "6", price: "2"},
        { key: '8', title: 'Мляко', num: "6", price: "2"},
        { key: '9', title: 'Брашно', num: "6", price: "2"},
        { key: '10', title: 'Хляб', num: "6", price: "2"},
        { key: '11', title: 'Тиква', num: "6", price: "2"},
        { key: '12', title: 'Праскова', num: "6", price: "2"},
    ]);

    return (
        <View style={[styles.container, {justifyContent: "flex-start"}]}>
            <View style={shoppingListStyle.summaryItems}>
                <View style={shoppingListStyle.totalItems}>
                    <Image source={require('../../../public/images/icons/shoppingList-selected.png')}/>
                    <Text>х артикула</Text>
                </View>

                <View style={shoppingListStyle.totalPrice}>
                    <Image source={require('../../../public/images/icons/cash.png')} style={{width: 30, height: 25}}/>
                    <Text>х артикула</Text>
                </View>
            </View>

            <CustomButton title={language("add")}
                          txtColor={"#fff"}
            />

            {/*<ShoppingListItem title={"Example checked item"}*/}
            {/*                  tickColor={"#fff"}*/}
            {/*                  circleColor={"#15A051"}*/}
            {/*                  price={"1.5лв"}*/}
            {/*                  num={"2"}*/}
            {/*/>*/}

            <FlatList data={items}
                      style={{alignSelf:"stretch", marginTop:10}}
                      renderItem={({item}) => (
                          <ShoppingListItem title={item.title}
                                            tickColor={"#15A051"}
                                            circleColor={"#fff"}
                                            price={item.price}
                                            num={item.num}
                          />
                      )}

            />



        </View>
    );
}