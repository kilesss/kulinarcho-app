import {StyleSheet} from "react-native";

export const stylesProfile = StyleSheet.create({

    settingsCardSmall: {
        flexDirection: "row",
        padding: 7,
        alignItems: "center",

    },
    settingsCardLarge: {
        paddingVertical: 30,
        alignItems: "center",
        width: "48%",
        textAlign: "center"

    },
    largeSettingsSection: {
        width: "100%",
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    groupsHeadingDeleteButton: {
        flexDirection: "row",
        paddingVertical: 3,
        elevation: 2,
        alignSelf: "flex-end",
        alignItems: 'center',
        paddingHorizontal: 5,
        backgroundColor: "#D40000",
        width: 92,
        borderRadius: 7,
        justifyContent: "flex-end",
    },
    requestButton: {
        borderRadius: 50,
        backgroundColor: "#15a051",
        width: 37,
        height: 37,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 3
    },
    requestComponent: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        minHeight: 70
    },
    pendingTag: {
        backgroundColor: "#EA9838",
        paddingVertical: 6,
        paddingHorizontal: 9,
        borderRadius: 8,
        elevation: 1
    }


})
