import Images from "../../../public/images";
const {View, TouchableOpacity, Image, TextInput} = require("react-native");
const {MaterialIcons} = require("@expo/vector-icons");
const React = require("react");
import {useNavigationState} from '@react-navigation/native';
import styles from "../../styles/styles";

const asdasd = 'asdasd';
export function LogoTitle(onPress) {
    const state = useNavigationState(state => state);
    const routeName = (state.routeNames[state.index]);
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            paddingBottom: 3,
            alignItems: "center",
            width: "100%",

        }}>
            {showSearch(routeName, onPress.navigation)}
            <TouchableOpacity onPress={onPress.onPress}>
                <Image
                    style={{
                        width: 47,
                        height: 47,
                        borderRadius: 50,
                    }}
                    source={Images.defaultProfile}
                />
            </TouchableOpacity>
        </View>
    )
};

function showSearch(route, navigation) {
    if (route === 'Recipes' || route === 'Cooking Book') {
        return (<TouchableOpacity style={{flex: 1, flexDirection: 'row'}}>
                <MaterialIcons name={"search"} size={33} color={"#4B4C4C"} style={{flex: 1}}/>
                <TextInput style={{
                    flex: 6,
                    ...styles.customButton,
                    alignSelf: "stretch",
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                    paddingLeft: 6,
                    color: "#4B4C4C",
                    padding: 0,
                }}
                 placeholder={'Търси рецепта'}
                 onSubmitEditing={(text) => {
                     if (route === 'Recipes') {
                         navigation.navigate('All Recipes', {searchString: text.nativeEvent.text})
                     } else if (route === 'Cooking Book') {
                         navigation.navigate('All Recipes', {searchString: text.nativeEvent.text, ownRecipe: 1})
                     }
                 }}
                />
            </TouchableOpacity>
        );
    }
    return '';
}

