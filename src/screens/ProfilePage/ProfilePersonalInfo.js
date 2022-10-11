import React, {useState} from "react";
import {Image, ScrollView, Text, TextInput, View} from "react-native";
import styles from '../../styles/styles'
import {CustomButton} from "../../components/display/CustomButton";
import language from "../../language/language";
import * as ImagePicker from "expo-image-picker";

export default function ProfilePersonalInfo({ navigation }) {

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });


        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={{alignSelf: "stretch", alignItems: "center"}}>
                {image && <Image source={{uri: image}} style={{width: 200, height: 200, borderRadius: 100}}/>}
            </View>
            <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Снимка<Text
                style={{color: "#15A051"}}>*</Text></Text>
            <CustomButton title={image ? "Друга снимка" : language("pickPicture")} onPress={() => pickImage(setImage)} padding={12} txtColor={"#4B4C4C"}
                          bgColor={"#cccccc"}/>

            <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("name")}<Text
                style={{color: "#15A051"}}>*</Text></Text>
            <TextInput style={{...styles.customButton, padding: 10}}/>

            <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("instagram")}</Text>
            <TextInput style={{...styles.customButton, padding: 10}}/>

            <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("youtube")}</Text>
            <TextInput style={{...styles.customButton, padding: 10}}/>

            <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("facebook")}</Text>
            <TextInput style={{...styles.customButton, padding: 10}}/>

            <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("twitter")}</Text>
            <TextInput style={{...styles.customButton, padding: 10}}/>

            <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("password")}</Text>
            <TextInput style={{...styles.customButton, padding: 10}}/>

            <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("confirmPassword")}</Text>
            <TextInput style={{...styles.customButton, padding: 10}}/>

            <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("shortDescription")}</Text>
            <TextInput multiline={true}
                       style={{...styles.customButton, padding: 10, height: 140, textAlignVertical: "top"}}/>

            <CustomButton title={"Запази"} txtColor={"#fff"}></CustomButton>
        </View>
        </ScrollView>
    );
}
