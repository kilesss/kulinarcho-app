import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import styles from "../../styles/styles";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {stylesProfile} from "../../styles/stylesProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {acceptUserRequest, deleteUserRequest, getGroupInfo, newRequest} from "../../RestRequests/generalRequest";
import RequestCard from "../../components/profile/RequestCard";
import {ALERT_TYPE, Dialog} from "react-native-alert-notification";

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

    async function acceptRequest(id, email) {
        await acceptUserRequest(JSON.stringify({requesterId: id}), DemoToken).then()
            .then(response => {
                console.log(response)
                if (response.errors) {
                    console.log(response.errors)
                }else{
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Успех!',
                        textBody: 'Успешно се присъединихте към групата на: ' + email,
                        button: 'Затвори',
                    })
                }
            })
    }

    async function rejectRequest(id) {
        await deleteUserRequest(JSON.stringify({requesterId: id}), DemoToken).then()
            .then(response => {
                console.log(JSON.stringify({requesterId: id}))
                console.log(response)
                if (response.errors) {
                    console.log(response.errors)
                }
            })
    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Моите Покани</Text>
            <FlatList
                data={incomingRequests}
                style={{alignSelf: 'stretch'}}
                renderItem={({item}) => (
                    <RequestCard
                        text={item.email}
                        onAcceptRequest={() => acceptRequest(item.id, item.email)}
                        onDeleteRequest={() => rejectRequest(item.id)}
                    />
                    )
            }/>

        </View>
    );
}

export default GroupRequests;
