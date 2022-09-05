import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Alert} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {TOPNAVI_H, BANNER_H} from '../constants';
import {stylesRecipes} from "../../styles/stylesRecipes";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import { MenuProvider } from 'react-native-popup-menu';
import styles from "../../styles/styles";
import language from "../../language/language";

export default function TopNavigation({title, scrollA, onPressBack, navigation}) {

    const safeArea = useSafeArea();

    const isFloating = !!scrollA;
    const [isTransparent, setTransparent] = useState(isFloating);


    const [showBox, setShowBox] = useState(true);
    const showConfirmDialog = () => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to delete this beautiful box?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        console.log("Pressed Yes")
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };

    useEffect(() => {
        if (!scrollA) {
            return;
        }
        const listenerId = scrollA.addListener(a => {
            const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top;
            isTransparent !== a.value < topNaviOffset &&
            setTransparent(!isTransparent);
        });
        return () => scrollA.removeListener(listenerId);
    });


    return (

            <>

            <View style={stylesRecipes.container(safeArea, isFloating, isTransparent)}>

                <TouchableOpacity onPress={onPressBack}
                    style={{backgroundColor: isTransparent ? "rgba(0,0,0,0.1)" : "transparent", borderRadius: 45, height: 28}}>
                    <MaterialIcons name={"arrow-back"} size={28} color={"#fff"} />
                </TouchableOpacity>
                <View style={{flexDirection: "row"}}>
                    <MaterialCommunityIcons name={"heart"} size={28} color={"#fff"}/>
                    <Menu style={{marginTop: 35}}>
                        <MenuTrigger style={{marginTop: -35, paddingHorizontal: 5}}>
                            <MaterialCommunityIcons name={"dots-vertical"} size={28} color={"#fff"}/>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => navigation.navigate("Add Edit Recipe")}
                                        style={stylesRecipes.popupMenu}>
                                <MaterialCommunityIcons name={"pen"} size={25} color={"#4B4C4C"}/>
                                <Text style={styles.subHeading}>Edit</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => showConfirmDialog()}
                                        style={stylesRecipes.popupMenu}>
                                <MaterialCommunityIcons name={"delete"} size={25} color={"red"}/>
                                <Text style={{...styles.subHeading, color: "red"}}>{language("delete")}</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>

                </View>
            </View>
            </>

    );
};


