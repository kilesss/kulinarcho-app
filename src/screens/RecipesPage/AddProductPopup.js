import {Text, TextInput, View} from "react-native";
import styles from "../../styles/styles";
import {stylesRecipes} from "../../styles/stylesRecipes";
import shoppingListStyle from "../../styles/stylesShoppingList";
import language from "../../language/language";
import {CustomButton} from "../../components/display/CustomButton";
import RBSheet from "react-native-raw-bottom-sheet";
import * as React from "react";
import {useEffect, useState} from "react";

export const AddProductPopup = React.forwardRef(({
                                                     product,
                                                     amount,
                                                     size
                                                 }, ref) => {

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
                height={300}
                openDuration={200}
                customStyles={{
                    container: {
                        backgroundColor: "#f5f5f5",
                        padding: 25,
                        justifyContent: "flex-start",
                    }
                }}
            >
                <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Продукт</Text>
                <TextInput style={{...styles.customButton, padding: 10}} defaultValue={productInput}/>

                <View style={stylesRecipes.addRecipeWrapContainer}>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>Количество</Text>
                        <TextInput style={{...styles.customButton, padding: 10}}
                                   defaultValue={amountInput}
                        />
                    </View>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>Разфасовка</Text>
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
