import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from "react-native";
import styles from "../../styles/styles";
import RequestCard from "../../components/profile/RequestCard";

function SentRequests({route}) {
    const {details} = route.params;

    return (
        <View style={styles.container}>
            <Text>Моите Покани</Text>
            {/*<RequestCard text={details.email}/>*/}
            <FlatList
                style={{alignSelf: "stretch"}}
                data={details}
                renderItem={({item}) => (
                    <RequestCard text={item.email}/>
                )
                }/>

        </View>
    );
}

export default SentRequests;
