import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {TOPNAVI_H, BANNER_H} from '../constants';
import {stylesRecipes} from "../../styles/stylesRecipes";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

export default function TopNavigation({title, scrollA, onPressBack}) {

    const safeArea = useSafeArea();

    const isFloating = !!scrollA;
    const [isTransparent, setTransparent] = useState(isFloating);

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
                    <MaterialCommunityIcons name={"dots-vertical"} size={28} color={"#fff"}/>
                </View>
            </View>

        </>
    );
};


