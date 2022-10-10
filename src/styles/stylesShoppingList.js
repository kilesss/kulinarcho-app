import {Dimensions, StyleSheet} from "react-native";

const deviceHeight = Dimensions.get("window").height

export const shoppingListStyle = StyleSheet.create({
    cardText: {
        justifyContent: "space-between",
        maxWidth: "90%",
    },
    card: {
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8,
        marginBottom: 0,
    },
    cardSubHeading: {
        color: "#fff",
        fontWeight: "bold",
    },
    cardTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        paddingTop: 40,

    },
    editContainer: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    receipt: {
        height: 100,
        width: 100,
        position: "absolute",
    },
    editButton: {
        position: "relative",
        zIndex: 5,
        elevation: 5,
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
        borderRadius: 90,
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
    },
    popup: {
        padding: 30,
        paddingTop: 20,
        backgroundColor: "#f5f5f5",
        width: "100%",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        maxHeight: 450,
    },
    outsideTouchable: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(74,74,74,0.4)"
    },
    popupTitle: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#4B4C4C",
        fontSize: 16,
        marginBottom: 15
    },
    popupProductName: {
        textAlign: "left",
        width: "100%",
    },
    popupAmount: {
        justifyContent: "space-between",
        flex: 1,
        marginRight: 10
    },
    popupPrice: {
        justifyContent: "space-between",
        flex: 1,
        marginLeft: 10
    },
    popupInput:{
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        width: 60,
        textAlign: "center",
        fontSize: 16,
    },
    popupButtons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom: 30
    },
    addListModal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignSelf: "stretch",
        padding: 30,
        paddingTop: 20,
        alignItems: "center",
        shadowColor: "#999",
        elevation: 10,
    },
    addListModalText: {

    },
    modalDeleteButton: {
        alignSelf: 'flex-end',
        marginBottom: 20,
        backgroundColor: "#D40000",
        borderRadius: 8,
        padding: 8,
    },
    popupDescription: {

    }
});

export default shoppingListStyle;
