import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import styles from "../../styles/styles";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {stylesProfile} from "../../styles/stylesProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getGroupInfo} from "../../RestRequests/generalRequest";
import RequestCard from "../../components/profile/RequestCard";

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
                        console.log(data)
                        setShowLoader(false)
                    }
                })
            }
        }, []);
    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <View style={styles.container}>
            <Text>Моите Покани</Text>
            <RequestCard text={"Test 1"}/>
            <FlatList
                data={incomingRequests}
                renderItem={({item}) => (
                    <RequestCard text={"Test"}/>
                    )
            }/>

        </View>
    );
}

export default GroupRequests;
