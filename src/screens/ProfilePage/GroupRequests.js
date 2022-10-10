import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import styles from "../../styles/styles";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {stylesProfile} from "../../styles/stylesProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {acceptUserRequest, deleteUserRequest, getGroupInfo, newRequest} from "../../RestRequests/generalRequest";
import RequestCard from "../../components/profile/RequestCard";
import {ALERT_TYPE, AlertNotificationRoot, Dialog} from "react-native-alert-notification";
import renderLoading from "../../components/loading/ShowLoader";
import language from "../../language/language";

function GroupRequests() {

    const [DemoToken, setDemoToken] = useState(true);
    const [groupInfo, setGroupInfo] = useState([]);
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getGroupInfo('GET', value).then(data => {
                    if (data) {
                        setGroupInfo(data)
                        console.log(data["requestsIncome"])
                        setIncomingRequests(data["requestsIncome"])
                        setShowLoader(false)
                    }
                })
            }
        }, []);
    }

    async function acceptRequest(invite) {
        await acceptUserRequest(JSON.stringify({requesterId: invite.id}), DemoToken).then()
            .then(response => {
                console.log(response)
                if (response.errors) {
                    console.log(response.errors)
                }else{
                    removeInviteCard(invite)
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Успех!',
                        textBody: 'Успешно се присъединихте към групата на: ' + invite.email,
                        button: 'Затвори',
                    })
                }
            })
    }

    async function rejectRequest(invite) {
        await deleteUserRequest(JSON.stringify({requesterId: invite.id}), DemoToken).then()
            .then(response => {
                console.log(JSON.stringify({requesterId: invite.id}))
                console.log(response)
                if (response.errors) {
                    console.log(response.errors)
                }else {removeInviteCard(invite)}
            })
    }

    function removeInviteCard(invite){
        let filteredArray = incomingRequests.filter(item => item !== invite)
        setIncomingRequests(filteredArray)
    }

    useEffect(() => {
        loadData()
    }, []);

    const IColors = {
        card: "#fff",
        success: "#15A051"
    };

    return (renderLoading(showLoader,
        <AlertNotificationRoot colors={[IColors, IColors]}>
        <View style={styles.container}>

            <FlatList
                data={incomingRequests}
                style={{alignSelf: 'stretch'}}
                ListEmptyComponent={<Text style={styles.heading}>{language("noInvites")}</Text>}
                renderItem={({item}) => (
                    <RequestCard
                        text={item.email}
                        onAcceptRequest={() => acceptRequest(item)}
                        onDeleteRequest={() => rejectRequest(item)}
                    />
                    )
            }/>

        </View>
        </AlertNotificationRoot>
    ));
}

export default GroupRequests;
