import {Image, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import * as React from "react";

export default function CustomHeader({onPress}) {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            paddingRight: 35,
            paddingLeft: 5,
            alignItems: "center"
        }}>
            <TouchableOpacity>
                <MaterialIcons name={"search"} size={33} color={"#4B4C4C"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <Image
                    style={{
                        width: 47,
                        height: 47,
                        borderRadius: 50,
                    }}
                    source={require('../../../public/images/bob.jpg')}
                />
            </TouchableOpacity>
        </View>
    );
}
