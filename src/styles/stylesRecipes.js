import {StyleSheet} from "react-native";

export const stylesRecipes = StyleSheet.create({
    categoriesSection:{
        alignSelf: "flex-start"
    },
    card:{
        borderRadius: 6,
    },
    categoriesCardIcon: {
        height: 75,
        width: 75,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 3
    },
    categoriesCard: {
        alignItems: "center",
        marginRight: 10,
    },
    recipesCard: {
        backgroundColor: "#fff",
        marginRight: 10,
        borderRadius: 8,
        shadowColor: "#999",
        shadowOffset: {
            width: 3,
            height: 2,
        },
        shadowOpacity: 0.35,
        shadowRadius: 5,
        elevation: 5,
        height: 190,
        width: 150
    },
    recipesCardImage: {
        height: 190,
        width: 150,
        borderRadius: 8,
    },
    recipesCardInfo: {
        position: "relative",
        marginTop: -77,
        borderRadius: 8,
        padding: 5,
        backgroundColor: "rgba(73,73,73,0.6)"
    },
    infoIconsWithText: {
        alignItems: "center",
        width: 75
    },
    cardInfoInsideContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    infoSmallText: {
        color: "#fff",
        fontSize: 12
    },
    recipesCardTitle: {
        color: "#fff",
        fontWeight: "bold",
        height: 30,
        lineHeight: 14,
    }

})