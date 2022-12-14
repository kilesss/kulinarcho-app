import React, {useEffect, useState} from 'react';
import {FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    deleteUserFromGroup,
    getGroupInfo,
    newRequest
} from "../../RestRequests/generalRequest";
import renderLoading from "../../components/loading/ShowLoader";
import {stylesCooks} from "../../styles/stylesCooks";
import styles from "../../styles/styles";
import {FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons} from "@expo/vector-icons";
import Images from "../../../public/images";
import language from "../../language/language";
import {stylesProfile} from "../../styles/stylesProfile";
import CookCard from "../../components/display/CookCard";
import stylesShoppingList from "../../styles/stylesShoppingList";
import shoppingListStyle from "../../styles/stylesShoppingList";
import {CustomButton} from "../../components/display/CustomButton";
import {ALERT_TYPE, Dialog, AlertNotificationRoot, Toast} from 'react-native-alert-notification';
import {useIsFocused} from '@react-navigation/native'
import ExampleAdd from "../../components/ExampleAdd";

function MyGroup({navigation}) {

    const isFocused = useIsFocused()

    const [DemoToken, setDemoToken] = useState(true);
    const [groupInfo, setGroupInfo] = useState([]);
    const [members, setMembers] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');
    const [sentRequests, setSentRequests] = useState([]);
    const [requestError, setRequestError] = useState('');

    function onInputChanged(changedText) {
        setText(changedText)
    }


    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getGroupInfo('GET', value).then(data => {
                    if (data) {
                        // const result = Object.values(data);
                        setGroupInfo(data)
                        setMembers(Object.values(data["groupUsers"]))
                        setSentRequests(data["requests"])
                        setShowLoader(false)
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    async function submitNewRequest(email) {
        await newRequest(JSON.stringify({requestedEmail: email}), DemoToken).then()
            .then(response => {
                if (response.errors) {
                    console.log(response.errors[0])
                    setRequestError(response.errors[0])
                } else {
                    setModalVisible(false)
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: '??????????!',
                        textBody: '???????????????? ???????? ?????????????? ?????????????????? ????: ' + text,
                        button: '??????????????',
                    })
                }
                setText('')
            })
    }

    async function removeUserFromGroup(id) {
        await deleteUserFromGroup(JSON.stringify({userID: id}), DemoToken).then()
            .then(response => {
                if (response.errors) {
                    console.log(response.errors)
                }
            })
        refreshPage()
        loadData()
    }

    function refreshPage(){
        setMembers([])
        setGroupInfo([])
        setSentRequests([])
    }

    useEffect(() => {
        loadData()
    }, [isFocused]);

    const IColors = {
        card: "#fff",
        success: "#15A051"
    };

    return (renderLoading(showLoader,
        <AlertNotificationRoot colors={[IColors, IColors]}>
            <View style={styles.container}>
                <View style={stylesCooks.profileDetails}>
                    {groupInfo["master"] === 1 ?
                        <View style={stylesProfile.groupsHeadingDeleteButton}>
                            <Text style={{color: "#fff", fontWeight: "bold"}}>????????????</Text>
                            <MaterialIcons name={"delete"} size={27} color={"#fff"}/>
                        </View>
                        : <View style={{marginTop: 20}}></View>
                    }
                    <Image source={Images.icons.groups}
                           style={{height: 95, width: 100, alignSelf: "center", marginTop: -15, marginBottom: -5}}/>
                    <Text style={[styles.heading, {fontSize: 22, alignSelf: 'center'}]}>{language('myGroup')}</Text>
                </View>

                <Text style={styles.heading}>?????????????? ???? ??????????????</Text>
                <View style={{maxHeight: 300, alignSelf: "stretch"}}>
                    <FlatList
                        data={members}
                        renderItem={({item}) => (
                            <CookCard
                                name={item.name}
                                image={item.profilePicture}
                                showDelete={groupInfo["master"] === 1}
                                handleDelete={() => removeUserFromGroup(item.id)}
                                hideNumRecipes={true}
                                onPress={() => navigation.navigate("Cooks Details", {cookId: item.id})}
                            />
                        )
                        }/>
                </View>
                <Text style={styles.heading}>???????????????????? ???? ??????????????</Text>
                {groupInfo["master"] === 1 ?
                    <View style={{alignSelf: "stretch"}}>
                        <TouchableOpacity style={[styles.customButton, stylesProfile.settingsCardSmall]}
                                          onPress={() => setModalVisible(true)}>
                            <MaterialCommunityIcons name={"plus"} color={"#15A051"} size={32}/>
                            <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>???????????? ???????? ??????
                                ??????????????</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.customButton, stylesProfile.settingsCardSmall]}
                                          onPress={() => navigation.navigate('Sent Requests', {details: sentRequests})}>
                            <Ionicons name={"paper-plane-outline"} color={"#15A051"} size={30}/>
                            <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>??????????????????
                                ????????????</Text>
                        </TouchableOpacity>
                    </View>
                    : ''
                }
                {groupInfo["master"] === 0 ?
                    <TouchableOpacity
                        style={[styles.customButton, stylesProfile.settingsCardSmall, {paddingVertical: 9}]}
                        onPress={() => console.log("--\nNo way of getting id: so can't remove yourself from group\n--")}>
                        <FontAwesome5 name={"door-open"} color={"#D40000"} size={25}/>
                        <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>??????????????
                            ??????????????</Text>
                    </TouchableOpacity>
                    : ''
                }
                <Modal animationType="slide"
                       transparent={true}
                       visible={modalVisible}
                       onRequestClose={() => {
                           setRequestError('')
                           setModalVisible(!modalVisible);
                       }}>
                    <View style={[styles.centeredView, {backgroundColor: "rgba(74,74,74,0.4)"}]}>
                        <View style={stylesShoppingList.addListModal}>
                            <View>
                                <Text style={styles.heading}>???????????? ???????? ?????? ??????????????</Text>
                            </View>
                            <TextInput
                                style={[{marginVertical: 22}, shoppingListStyle.popupInput, shoppingListStyle.popupProductName]}
                                defaultValue={text}
                                placeholder={"?????????? ??????????..."}
                                onChangeText={(changedText) => onInputChanged(changedText)}
                            />
                            <Text
                                style={{...styles.errorMessage, marginTop: -19, marginBottom: 12}}>{requestError}</Text>

                            <CustomButton
                                onPress={() => {
                                    submitNewRequest(text).then(r => '')
                                }}
                                title={"?????????????? ????????????"}
                                txtColor={"#fff"}
                                padding={10}
                            />
                            <Text onPress={() => {
                                setRequestError('')
                                setModalVisible(!modalVisible)
                            }}>
                                {language("cancel")}
                            </Text>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={{paddingHorizontal: 20}}>
                <ExampleAdd height={55}/>
            </View>
        </AlertNotificationRoot>
    ));
}

export default MyGroup;
