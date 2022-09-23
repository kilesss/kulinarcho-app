import React from 'react';
import {Button, Text, View} from "react-native";

function FourthPage({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
            <Text>First Page</Text>
            <Button title={"Next"} onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Shopping List' }],
            })
            }></Button>
        </View>
    );
}

export default FourthPage;
