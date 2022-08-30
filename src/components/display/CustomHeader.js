const {View, TouchableOpacity, Image} = require("react-native");
const {MaterialIcons} = require("@expo/vector-icons");
const React = require("react");


export const LogoTitle = ({onPress}) => (
    <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        paddingRight: 35,
        paddingLeft: 5,
        paddingBottom: 3,
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
