import React, {useState} from 'react';
import {FlatList, Text, View} from "react-native";
import styles from "../../styles/styles";
import DropDownPicker from "react-native-dropdown-picker";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import {getIconInfo} from "../../components/HelpFunctions";
import {ProductCard} from "../../components/display/ProductCard";
import Images from "../../../public/images";
import language from "../../language/language";
import {CustomButton} from "../../components/display/CustomButton";

function WeekMenuPickARecipe({navigation}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);

    const products = [
        {title: "Банан", image: Images.productCategory.fruitVeg, textRight: "200 г."},
        {title: "Моркови", image: Images.productCategory.fruitVeg, textRight: "200 г."},
        {title: "Банан", image: Images.productCategory.fruitVeg, textRight: "200 г."},
        {title: "Банан", image: Images.productCategory.fruitVeg, textRight: "200 г."}
    ]

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setItems={setItems}
                setOpen={setOpen}
                setValue={setValue}
                listMode={"SCROLLVIEW"}
                listItemLabelStyle={{
                    color: "#4B4C4C",
                }}
                style={{...styles.customButton, padding: 10, borderWidth: 0, marginBottom: 10}}
                dropDownContainerStyle={{
                    borderWidth: 0,
                    elevation: 3,
                    shadowColor: "#888",
                }}
            />

            <RecipesCardSmall
                title={"opa"}
                time={20}
                servings={2}
                publicStatus={2}
                photo={"/pictures/profilePicture/70/0_1652967840.jpg"}
                category={getIconInfo(1)}/>

            <Text style={styles.heading}>Нужни Продукти</Text>
            <FlatList
                data={products}
                style={{alignSelf: "stretch"}}
                renderItem={({item}) => (
                    <ProductCard title={item.title} image={item.image} textRight={item.textRight}/>
                )}/>

            <View style={{flexDirection: "row", alignItems: "center", alignSelf: "flex-end"}}>
                <Text style={{...styles.subHeading, marginRight: 10}}>{language("cancel")}</Text>
                <CustomButton title={language("add")} txtColor={"#fff"} onPress={() => navigation.goBack()}/>
            </View>

        </View>
    );
}

export default WeekMenuPickARecipe;
