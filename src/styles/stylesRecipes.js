import {StyleSheet} from "react-native";
import {BANNER_H, TOPNAVI_H} from "../components/constants";

export const stylesRecipes = StyleSheet.create({
    categoriesSection:{
        alignSelf: "flex-start"
    },
    card:{
        borderRadius: 6,
    },
    categoriesCardIcon: {
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
        width: 150,
    },
    recipesCardImage: {
        height: 190,
        width: 150,
        borderRadius: 8,
    },
    recipesCardInfo: {
        position: "relative",
        marginTop: -74,
        borderRadius: 8,
        padding: 5,
        paddingVertical: 3,
        backgroundColor: "rgba(42,42,42,0.5)"
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
        textAlign:"center",
        fontWeight: "bold",
        height: 30,
        lineHeight: 14,
    },
    recipesCardCategory: {
        position:"absolute",
    },
    recipeDetails: {
        flex:1,
        backgroundColor: "#F5F5F5",
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        marginTop: -24,
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: 70
    },
    recipeDetailsBanner: {
        marginTop: -1000,
        paddingTop: 1000,
        alignItems: 'center',
        overflow: 'hidden',
    },
    topLine: {
        borderWidth: 3,
        borderColor: "rgba(153,153,153,0.3)",
        width: 60,
        borderRadius: 50,
        alignSelf:"center",
        marginBottom: 5
    },
    headingSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    timeSection:{
        alignItems: "center"
    },
    portionsSection: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15
    },
    cookCard: {
        shadowColor: "#999",
        elevation: 3,
        backgroundColor: "#fff",
        borderRadius: 45,
        flexDirection: "row",
        marginVertical: 5,
        alignItems: "center",
        alignSelf: "stretch"
    },
    switchMenu: {
        width: "100%"
    },
    cookCardImage: {
        borderRadius: 45,
        height: 55,
        width: 55
    },
    productCard: {
        elevation: 3,
        shadowColor: "#999",
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginVertical: 4
    },
    productCardIconTitle: {
        flexDirection: "row",
        alignItems: "center"
    },

    recipesCardImageSmall: {
        height: "100%",
        width: 75,
        borderRadius: 8,
    },
    recipesCardSmall: {
        backgroundColor: "#fff",
        shadowColor: "#999",
        elevation: 3,
        flexDirection: "row",
        borderRadius: 8,
        marginBottom: 7,
        width: "100%",
        justifyContent: "space-between",
        // alignItems: "center"
    },
    recipesCardInfoSmall: {
        paddingLeft: 7,
    },
    recipesCardInfoSmallInner: {
        flexDirection: "row",
        marginLeft: -10,
        paddingBottom: 5,

    },
    recipesCardSmallText: {
        color: "#4B4C4C",
        fontWeight: "bold",
        fontSize: 12
    },
    paragraph: {
        textAlign: "justify",
        lineHeight: 15,
        fontWeight: "regular",
        marginBottom: 20},


    banner: scrollA => ({
        height: BANNER_H,
        width: '120%',
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
                    outputRange: [2, 1, .8, .8],
                }),
            },
        ],
    }),
    container: (safeArea, isFloating, isTransparent) => ({
        paddingTop: safeArea.top,
        marginBottom: isFloating ? -TOPNAVI_H - safeArea.top : 0,
        height: TOPNAVI_H + safeArea.top,
        // alignItems: "center",
        shadowOffset: {y: 0},
        backgroundColor: isTransparent ? 'transparent' : '#15A051',
        shadowOpacity: isTransparent ? 0 : 0.5,
        shadowColor: "#000",
        elevation: isTransparent ? 0.01 : 5,
        zIndex: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20
    }),
    title: isTransparent => ({
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: isTransparent ? '#FFF' : '#000',
    })

})
