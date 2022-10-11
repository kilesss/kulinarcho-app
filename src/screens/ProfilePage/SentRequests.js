import React, {useEffect, useState} from 'react';
import {FlatList, View} from "react-native";
import styles from "../../styles/styles";
import SentRequestsComponent from "../../components/profile/SentRequestsComponent";
import {deleteUserRequest, getGroupInfo} from "../../RestRequests/generalRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useIsFocused} from "@react-navigation/native";
import renderLoading from "../../components/loading/ShowLoader";

function SentRequests() {
    const isFocused = useIsFocused()

    const [DemoToken, setDemoToken] = useState('');
    const [showLoader, setShowLoader] = useState(true);
    const [sentRequests, setSentRequests] = useState([]);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getGroupInfo('GET', value).then(data => {
                    if (data) {
                        setSentRequests(data["requests"])
                        setShowLoader(false)
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    useEffect(() => {
        loadData()
    }, [isFocused]);

    async function deleteInvite(item) {
        let body;
        item.id ? body = {requesterId: item.id} : body = {email: item.email}

        await deleteUserRequest(JSON.stringify({body}), DemoToken).then()
            .then(response => {
                let filteredArray = sentRequests.filter(item2 => item2 !== item)
                setSentRequests(filteredArray)
                if (response.errors) {
                    console.log(response.errors)
                }
            })
    }

    return (renderLoading(showLoader,
        <View style={styles.container}>
            <FlatList
                style={{alignSelf: "stretch"}}
                data={sentRequests}
                renderItem={({item}) => (
                    <SentRequestsComponent
                        text={item.email}
                        onDeleteRequest={() => deleteInvite(item)}
                    />
                )
                }/>

        </View>
        )
    );
}

export default SentRequests;
