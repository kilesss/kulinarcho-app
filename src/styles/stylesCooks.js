import {StyleSheet} from "react-native";

export const stylesCooks = StyleSheet.create({
    profileImage:{
        borderRadius: 100,
        height: 170,
        width: 170,
    },
    profileDetails: {
        alignItems: "center",
        backgroundColor: "#fff",
        alignSelf: "stretch",
        flex: 1,
        paddingHorizontal: "22%",
        paddingVertical: 15,
        elevation: 5,
        shadowColor: "#999",

    },
    profileRecipes: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        paddingVertical: 20,
    }


})
