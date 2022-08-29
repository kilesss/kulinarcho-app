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
        paddingVertical: 12,
        marginTop: 12,
        elevation: 5,
        borderRadius: 8,
        shadowColor: "#999",

    },
    profileRecipes: {
        flex: 1,
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        paddingVertical: 10,
    }


})
