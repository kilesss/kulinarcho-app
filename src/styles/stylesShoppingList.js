import {StyleSheet} from "react-native";

export const shoppingListStyle = StyleSheet.create({
    cardText: {
        justifyContent: "space-between",
        color: "red",
    },
    card: {
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8,
        marginBottom: 10

    },
    cardSubHeading: {
        color: "#fff",
        fontWeight: "bold",

    },
    cardTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        paddingTop: 55
    },
    editContainer: {
        flexDirection: "column",

    },
    receipt: {
        height: 100,
        width: 100,
        position: "absolute",
        marginLeft: -65,
        marginTop: 5
    },
    editButton: {
        position: "relative",
        zIndex: 2,
        color: "white",
        marginTop: -5
    },
    buttonWithTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 15
    },
    summaryItems: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
        marginBottom: 15,
    },
    totalPrice: {
        flex: 1,
        alignItems: "center"
    },
    totalItems: {
        flex: 1,
        alignItems: "center"
    },
    item: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignSelf: "stretch",
        elevation: 0,
        shadowColor: "#999",
        paddingTop: 7,
        paddingBottom: 7,
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 7,
        borderRadius: 6,
        alignItems: "center"
    },
    checkBox:{
        borderColor: "#15A051",
        borderWidth: 2,
        borderRadius: 45,
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    itemTitle: {
        fontWeight: "bold",
        marginBottom: -3
    },
    itemSubHeading: {
        fontSize: 12
    }
});

export default shoppingListStyle;