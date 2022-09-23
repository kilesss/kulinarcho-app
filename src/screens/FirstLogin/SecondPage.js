import React from 'react';
import {Button, Text, View} from "react-native";

function SecondPage({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
            <Text>First Page</Text>
            <Button title={"Next"} onPress={() => navigation.navigate("Page 3")}></Button>
        </View>
    );
}

export default SecondPage;
