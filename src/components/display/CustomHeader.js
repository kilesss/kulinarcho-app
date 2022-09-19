import {Alert, Modal, Text, TextInput} from "react-native";
import styles from "../../styles/styles";
import {stylesRecipes} from "../../styles/stylesRecipes";
import {useEffect, useState} from "react";
import {SearchBar} from '@rneui/themed';

const {View, TouchableOpacity, Image} = require("react-native");
const {MaterialIcons} = require("@expo/vector-icons");
const React = require("react");


export default function LogoTitle({navigation}) {
    const [show, setShow] = useState(false)
    const [text, setText] = useState('');

    function onInputChange(changedText){
        setText(changedText)
    }

    function onSubmitSearch(){
        navigation.navigate("Recipes", {search: text})
        setText("")
    }



    function showSearch() {
        return (show ?
            <TextInput
                style={{backgroundColor: "#ccc", width: 200}}
                onChangeText={newText => onInputChange(newText)}
                defaultValue={text}
                onSubmitEditing={() => onSubmitSearch()}
                onBlur={() => setShow(false)}
            />
            : <Text>Ne Opa</Text>)

    }

    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            paddingBottom: 3,
            alignItems: "center",
            width: "100%",

        }}>
            <TouchableOpacity
                style={{flexDirection: "row"}}
                onPress={() => setShow(!show)}>
                <MaterialIcons name={"search"} size={33} color={"#4B4C4C"}/>
                {showSearch()}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Image
                    style={{
                        width: 47,
                        height: 47,
                        borderRadius: 50,
                    }}
                    source={require('../../../public/images/bob.jpg')}
                />
            </TouchableOpacity>

        </View>

    );
}

