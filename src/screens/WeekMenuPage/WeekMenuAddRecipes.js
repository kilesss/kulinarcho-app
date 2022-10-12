import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import stylesShoppingList from "../../styles/stylesShoppingList";
import styles from "../../styles/styles";
import language from "../../language/language";
import {CustomButton} from "../../components/display/CustomButton";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSamll";
import {getIconInfo} from "../../components/HelpFunctions";
import {stylesProfile} from "../../styles/stylesProfile";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";

function WeekMenuAddRecipes({navigation}) {

    return (

        <View style={styles.container}>
            <View style={{...stylesShoppingList.buttonWithTitle, marginBottom: 0}}>
                <View style={{flex: 1}}>
                    <Text style={{...styles.heading, fontSize: 18}}>11/06/2022</Text>
                </View>
                <View>
                    <CustomButton title={language("add")}
                                  bgColor={"#15A051"}
                                  txtColor={"#fff"}
                                  padding={7}
                                  onPress={() => navigation.navigate("Week Menu Pick Recipe")}
                    />
                </View>
            </View>

            <RecipesCardSmall
                title={"opa"}
                time={20}
                servings={2}
                publicStatus={2}
                photo={"/pictures/profilePicture/70/0_1652967840.jpg"}
                category={getIconInfo(1)} />


            <View style={stylesShoppingList.buttonWithTitle}>
                <View style={{flex: 1}}>
                    <Text style={{...styles.heading, fontSize: 18}}>11/06/2022</Text>
                </View>
                <View>
                    <CustomButton title={language("add")}
                                  bgColor={"#15A051"}
                                  txtColor={"#fff"}
                                  padding={7}
                                  onPress={() => navigation.navigate("Week Menu Pick Recipe")}
                    />
                </View>
            </View>


            <CustomButton
                title={"Запази меню"}
                txtColor={"#fff"}
                onPress={() => console.log("Запази рецепта функция")}
            />
            <TouchableOpacity
                style={[styles.customButton, stylesProfile.settingsCardSmall, {paddingVertical: 13}]}
                onPress={() => navigation.navigate("Week Menu Shopping List")}>
                <Ionicons name={"receipt"} color={"#15A051"} size={27}/>
                <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>Генерирай списък за пазар</Text>
            </TouchableOpacity>
        </View>
    );
}

export default WeekMenuAddRecipes;
