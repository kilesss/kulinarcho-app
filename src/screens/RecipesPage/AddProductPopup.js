import {Text, TextInput, View} from "react-native";
import styles from "../../styles/styles";
import {stylesRecipes} from "../../styles/stylesRecipes";
import shoppingListStyle from "../../styles/stylesShoppingList";
import language from "../../language/language";
import {CustomButton} from "../../components/display/CustomButton";
import RBSheet from "react-native-raw-bottom-sheet";
import * as React from "react";
import {useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import DropDownPicker from "react-native-dropdown-picker";
import {ProductCard} from "../../components/display/ProductCard";

export const AddProductPopup = React.forwardRef(({
                                                     product,
                                                     amount,
                                                     size
                                                 }, ref) => {


        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState([
            {label: 'Чушка', value: '1'},
            {label: 'Дроб', value: '2'},
            {label: 'Фуссс', value: '3'},
            {label: 'Куссс', value: '4'},
            {label: 'Apple', value: '5'},
            {label: 'Няма', value: '6'},
            {label: 'Чушка', value: '7'},
            {label: 'Дроб', value: '8'},
            {label: 'Фуссс', value: '9'},
            {label: 'Куссс', value: '10'},
            {label: 'Apple', value: '11'},
            {label: 'Няма', value: '12'},
            {label: 'Чушка', value: '13'},
            {label: 'Дроб', value: '14'},
            {label: 'Фуссс', value: '15'},
            {label: 'Куссс', value: '16'},
            {label: 'Apple', value: '17'},
            {label: 'Няма', value: '18'},

        ]);
        const [productInput, setProduct] = useState("");
        const [amountInput, setAmount] = useState("");
        const [sizeInput, setSize] = useState("");
        useEffect(() => {
            setProduct(product)
            setAmount(amount)
            setSize(size)
        });

        return (
            <RBSheet
                ref={ref}
                height={330}
                openDuration={200}
                customStyles={{
                    container: {
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        backgroundColor: "#f5f5f5",
                        padding: 30,
                        justifyContent: "flex-start",
                    }
                }}
            >
                <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("product")}</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    listMode={"MODAL"}
                    modalTitle={"Избери Продукт"}
                    searchable={true}
                    modalContentContainerStyle={{
                        backgroundColor: "#f2f2f2",
                        padding: 20
                    }}
                    listItemLabelStyle={{
                        color: "#4B4C4C",
                    }}

                    renderListItem={(props) => (
                        <ProductCard title={props.label}/>
                    )}
                    setItems={setItems}
                    style={{...styles.customButton, padding: 10, borderWidth: 0}}
                    dropDownContainerStyle={{
                        borderWidth: 0,
                        elevation: 3,
                        shadowColor: "#888"
                    }}
                />

                <View style={stylesRecipes.addRecipeWrapContainer}>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("amount")}</Text>
                        <TextInput style={{...styles.customButton, padding: 10}}
                                   defaultValue={amountInput}
                        />
                    </View>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>{language("portionType")}</Text>
                        <TextInput style={{...styles.customButton, padding: 10}}
                                   defaultValue={sizeInput}
                        />
                    </View>
                </View>


                <View style={{...shoppingListStyle.popupButtons, marginRight: 0, marginTop: 15}}>
                    <Text style={{marginRight: 15}} onPress={() => ref.current.close()}>
                        {language("cancel")}
                    </Text>
                    <CustomButton title={"Добави"}
                                  padding={10}
                                  txtColor={"#fff"}/>
                </View>

            </RBSheet>
        )
    }
)
