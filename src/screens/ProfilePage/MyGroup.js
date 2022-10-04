import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getGroupInfo, getShoppingListProducts} from "../../RestRequests/generalRequest";
import renderLoading from "../../components/loading/ShowLoader";
import {stylesCooks} from "../../styles/stylesCooks";
import styles from "../../styles/styles";
import {FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons} from "@expo/vector-icons";
import Images from "../../../public/images";
import language from "../../language/language";
import {stylesProfile} from "../../styles/stylesProfile";
import CookCard from "../../components/display/CookCard";

function MyGroup({navigation}) {

    const [DemoToken, setDemoToken] = useState(true);
    const [groupInfo, setGroupInfo] = useState([]);
    const [members, setMembers] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getGroupInfo('GET', value).then(data => {
                    if (data) {
                        // const result = Object.values(data);
                        setGroupInfo(data)
                        setMembers(Object.values(data["groupUsers"]))
                        console.log(data["master"])
                        setShowLoader(false)
                    }
                })
            }
        }, []);
    }

    useEffect(() => {
        loadData()
    }, []);


    return (renderLoading(showLoader,
        <View style={styles.container}>
            <View style={stylesCooks.profileDetails}>
                {groupInfo["master"] === 1 ?
                <View style={stylesProfile.groupsHeadingDeleteButton}>
                    <Text style={{color: "#fff", fontWeight: "bold"}}>Изтрий</Text>
                    <MaterialIcons name={"delete"} size={27} color={"#fff"}/>
                </View>
                    : ''
                }
                <Image source={Images.icons.groups}
                       style={{height: 95, width: 100, alignSelf: "center", marginTop: -15, marginBottom: -5}}/>
                <Text style={[styles.heading, {fontSize: 22, alignSelf: 'center'}]}>{language('myGroup')}</Text>
            </View>

            <Text style={styles.heading}>Членове на Групата</Text>
            <View style={{maxHeight: 300, alignSelf: "stretch"}}>
                <FlatList
                    data={members}
                    renderItem={({item}) => (
                        <CookCard
                            name={item.name}
                            image={item.profilePicture}
                            onPress={() => navigation.navigate("Cooks Details", {cookId: item.id})}
                        />
                    )
                    }/>
            </View>

            <Text style={styles.heading}>Управление на Групата</Text>
            <TouchableOpacity style={[styles.customButton, stylesProfile.settingsCardSmall]}>
                <MaterialCommunityIcons name={"plus"} color={"#15A051"} size={32}/>
                <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>Добави хора към групата</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.customButton, stylesProfile.settingsCardSmall]}>
                <Ionicons name={"paper-plane-outline"} color={"#15A051"} size={30}/>
                <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>Изпратени Покани</Text>
            </TouchableOpacity>
            {groupInfo["master"] === 0 ?
            <TouchableOpacity style={[styles.customButton, stylesProfile.settingsCardSmall, {paddingVertical: 9}]}>
                <FontAwesome5 name={"door-open"} color={"#D40000"} size={25}/>
                <Text style={{...styles.subHeading, flex: 1, paddingLeft: 5, fontSize: 16}}>Напусни Групата</Text>
            </TouchableOpacity>
                : ''
            }


        </View>
    ));
}

export default MyGroup;
