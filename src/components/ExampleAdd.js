import React from 'react';
import {Text, View} from "react-native";

function ExampleAdd({height}) {
    return (
        <View
            style={{height: height, width: "100%", borderColor: "green", backgroundColor: "#fff", borderWidth: 2, elevation: 2}}
        >
            <Text>Advert</Text>
        </View>
    );
}

export default ExampleAdd;
