import {StyleSheet} from "react-native";

export const stylesCooks = StyleSheet.create({
    profileImage:{
        borderRadius: 100,
        height: 160,
        width: 160,
    },
    profileDetails: {
        alignItems: "center",
        backgroundColor: "#fff",
        alignSelf: "stretch",
        paddingHorizontal: "20%",
        paddingVertical: 12,
        marginTop: 12,
        elevation: 2,
        borderRadius: 8,
        shadowColor: "#999",

    },
    profileRecipes: {
        width: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
        paddingVertical: 10,
    },
    numRecipesText: {
        fontSize: 16,
        marginTop: -15,
        marginBottom: 5,
        color: "#15a051"
    },


})
