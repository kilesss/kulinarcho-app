import {Button, FlatList, Image, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as React from "react";

import RBSheet from "react-native-raw-bottom-sheet";
import {useRef, useState} from "react";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton";
import Checkbox from "expo-checkbox";
import language from "../../language/language";
import {stylesRecipes} from "../../styles/stylesRecipes";
import {ProductCard} from "../../components/display/ProductCard";

export default function AddEditRecipe() {

    const refRBSheet = useRef();

    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <ScrollView>
            <View style={{...styles.container, alignSelf: "stretch"}}>
                {/*<Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()}/>*/}
                <RBSheet
                    ref={refRBSheet}
                    height={300}
                    openDuration={200}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                >
                    <Text style={styles.heading}>Тук ще излизат нужните полета.</Text>
                </RBSheet>

                <View style={{alignSelf: "stretch", alignItems: "center"}}>
                    {image && <Image source={{uri: image}} style={{width: "100%", height: 220, borderRadius: 8}}/>}
                </View>
                <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Снимка<Text
                    style={{color: "#15A051"}}>*</Text></Text>
                <CustomButton title={"Pick image..."} onPress={pickImage} padding={12} txtColor={"#4B4C4C"}
                              bgColor={"#cccccc"}/>

                <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Заглавие<Text
                    style={{color: "#15A051"}}>*</Text></Text>
                <TextInput style={{...styles.customButton, padding: 10}}/>

                <View style={stylesRecipes.addRecipeProductsContainer}>
                    <Checkbox color={"#15A051"}/>
                    <Text style={{...styles.heading, marginBottom: 5, marginTop: -3, marginLeft: 5}}>Публична
                        рецепта<Text style={{color: "#15A051"}}>*</Text></Text>
                </View>

                <View style={stylesRecipes.addRecipeProductsContainer}>
                    <Text style={{...styles.heading, marginBottom: 0, flex: 1}}>Продукти<Text
                        style={{color: "#15A051"}}>*</Text></Text>
                    <CustomButton title={language("add")}
                                  txtColor={"#fff"}
                                  padding={5}
                                  onPress={() => refRBSheet.current.open()}/>
                </View>
                <ProductCard title={"Test"} icon={"carrot"} iconColor={"#c5550f"}/>

                <View style={stylesRecipes.addRecipeProductsContainer}>
                    <Text style={{...styles.heading, marginBottom: 0, flex: 1}}>Стъпки<Text
                        style={{color: "#15A051"}}>*</Text></Text>
                    <CustomButton title={language("add")}
                                  txtColor={"#fff"}
                                  padding={5}
                                  onPress={() => refRBSheet.current.open()}
                    />
                </View>

                <View style={[stylesRecipes.productCard, {flexDirection: "column", alignItems: "flex-start"}]}>
                    <Text style={[styles.smallGreenText, {fontSize: 16}]}>Тест</Text>
                    <Text style={[styles.subHeading, {fontWeight: "regular"}]}>
                        Просто тест бе
                    </Text>
                </View>

                <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>Категория<Text
                    style={{color: "#15A051"}}>*</Text></Text>
                <TextInput style={{...styles.customButton, padding: 10}}/>

                <View style={stylesRecipes.addRecipeWrapContainer}>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>Приготвяне<Text
                            style={{color: "#15A051"}}>*</Text></Text>
                        <TextInput style={{...styles.customButton, padding: 10}}/>
                    </View>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>Готвене<Text
                            style={{color: "#15A051"}}>*</Text></Text>
                        <TextInput style={{...styles.customButton, padding: 10}}/>
                    </View>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>Общо време<Text
                            style={{color: "#15A051"}}>*</Text></Text>
                        <TextInput style={{...styles.customButton, padding: 10}}/>
                    </View>
                    <View style={{width: "47%"}}>
                        <Text style={{...styles.heading, marginBottom: 0, marginTop: 10}}>Порции<Text
                            style={{color: "#15A051"}}>*</Text></Text>
                        <TextInput style={{...styles.customButton, padding: 10}}/>
                    </View>
                </View>

                <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Описание</Text>
                <TextInput multiline={true}
                           style={{...styles.customButton, padding: 10, height: 140, textAlignVertical: "top" }}/>


                <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Видео линк</Text>
                <TextInput style={{...styles.customButton, padding: 10, marginBottom: 15}}/>

                <CustomButton title={language("add")} txtColor={"#fff"}/>


            </View>
        </ScrollView>
    );
}
