import React, {useEffect, useState} from "react";
import {Image, ScrollView, Text, TextInput, View} from "react-native";
import styles from '../../styles/styles'
import {CustomButton} from "../../components/display/CustomButton";
import language from "../../language/language";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {editRecipe, getGroupInfo, updateProfile} from "../../RestRequests/generalRequest";
import {useIsFocused} from "@react-navigation/native";
import renderLoading from "../../components/loading/ShowLoader";
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ProfilePersonalInfo({navigation}) {
    const isFocused = useIsFocused()

    const [demoToken, setDemoToken] = useState('');
    const [personalInfo, setPersonalInfo] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');
    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [description, setDescription] = useState('');


    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getGroupInfo('GET', value).then(data => {
                    if (data) {
                        console.log(data)
                        setPersonalInfo(data)
                        setShowLoader(false)
                        setName(data.name)
                        setInstagram(data.instagram)
                        setYoutube(data.youtube)
                        setFacebook(data.facebook)
                        setTwitter(data.twitter)
                        setDescription(data.description)
                        if (data.photo) {
                            setImage(personalInfo.photo)
                        }
                        setShowLoader(false)
                    }
                })
            }
        }, []);
    }

    useEffect(() => {
        loadData()
    }, [isFocused]);

    function submitForm() {
        let obj = {}
        if (name) {
            obj['name'] = name
        }
        if (instagram) {
            obj['instagram'] = instagram
        }
        if (youtube) {
            obj['youtube'] = youtube
        }
        if (facebook) {
            obj['facebook'] = facebook
        }
        if (twitter) {
            obj['twitter'] = twitter
        }
        if (password) {
            obj['password'] = password
        }
        if (confirmPassword) {
            obj['confirmPassword'] = confirmPassword
        }
        if (description) {
            obj['description'] = description
        }
        if (image) {obj['picture'] = image}

        console.log(JSON.stringify(obj))
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                updateProfile(JSON.stringify(obj), value).then()
                    .then(response => {
                        if (response.errors) {
                            const restErr = JSON.stringify(response.errors);
                            console.log(restErr);
                        }
                    })
            }
        })

    }

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: true, aspect: [4, 3], quality: 1,
        });
        const manipResult = await ImageManipulator.manipulateAsync(
            result.localUri || result.uri, [], {format: 'jpeg'}
        );
        const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {encoding: 'base64'});
        // console.log(base64)
        // console.log('asdasdasdasdasdasd')
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (renderLoading(showLoader,
            <ScrollView>
                <View style={styles.container}>
                    <View style={{alignSelf: "stretch", alignItems: "center"}}>
                        {image && <Image source={{uri: image}} style={{width: 200, height: 200, borderRadius: 100}}/>}
                    </View>
                    <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>Снимка<Text
                        style={{color: "#15A051"}}>*</Text></Text>
                    <CustomButton title={image ? "Друга снимка" : language("pickPicture")}
                                  onPress={() => pickImage(setImage)} padding={12} txtColor={"#4B4C4C"}
                                  bgColor={"#cccccc"}/>

                    <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("name")}<Text
                        style={{color: "#15A051"}}>*</Text></Text>
                    <TextInput style={{...styles.customButton, padding: 10}} defaultValue={name}
                               onChangeText={newText => setName(newText)}/>

                    <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("instagram")}</Text>
                    <TextInput style={{...styles.customButton, padding: 10}} defaultValue={instagram}
                               onChangeText={newText => setInstagram(newText)}/>

                    <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("youtube")}</Text>
                    <TextInput style={{...styles.customButton, padding: 10}} defaultValue={youtube}
                               onChangeText={newText => setYoutube(newText)}/>

                    <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("facebook")}</Text>
                    <TextInput style={{...styles.customButton, padding: 10}} defaultValue={facebook}
                               onChangeText={newText => setFacebook(newText)}/>

                    <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("twitter")}</Text>
                    <TextInput style={{...styles.customButton, padding: 10}} defaultValue={twitter}
                               onChangeText={newText => setTwitter(newText)}/>

                    <Text style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("password")}</Text>
                    <TextInput style={{...styles.customButton, padding: 10}} defaultValue={password}
                               secureTextEntry={true}
                               onChangeText={newText => setPassword(newText)}/>

                    <Text
                        style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("confirmPassword")}</Text>
                    <TextInput style={{...styles.customButton, padding: 10}} defaultValue={confirmPassword}
                               secureTextEntry={true}
                               onChangeText={newText => setConfirmPassword(newText)}/>

                    <Text
                        style={{...styles.heading, marginBottom: 0, marginTop: 5}}>{language("shortDescription")}</Text>
                    <TextInput multiline={true}
                               style={{...styles.customButton, padding: 10, height: 140, textAlignVertical: "top"}}
                               defaultValue={description} onChangeText={newText => setFacebook(newText)}/>

                    <CustomButton title={"Запази"} txtColor={"#fff"} onPress={() => submitForm()}></CustomButton>
                </View>
            </ScrollView>
        )
    );
}
