import React, {useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import styles from '../../styles/styles'
import CookCard from "../../components/display/CookCard";
import language from "../../language/language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFollower, getProducts, getProductTypes, getPublicProfiles} from "../../RestRequests/generalRequest";
import FloatingActionButton from "../../components/display/FloatingActionButton";
import AddShoppingListModal from "../../components/shoppingList/AddShoppingListModal";

export default function CookersPage({navigation}) {
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);
    const [cooks, setCooks] = useState([]);
    const [cooksFollowing, setCooksFollowing] = useState();
    const [addModalVisible, setAddModalVisible] = useState(false);

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getPublicProfiles('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setCooks(result)
                    }
                }).catch((err) => {
                    console.log(err);
                });
                getFollower(value).then(data => {
                    if(data){
                        setCooksFollowing(Object.values(data.response))
                        setShowLoader(false);
                    }
                })
            }
        }, []);
    }

    useEffect(() => {
        loadData();

    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={{marginHorizontal: 20, marginVertical: 10}}>
                <Text style={styles.heading}>{language("cooksFollowing")}</Text>

                <FlatList
                    data={cooksFollowing}
                    style={{alignSelf: "stretch"}}
                    renderItem={({item}) => (
                        <CookCard
                            name={item.name}
                            image={item.profilePicture}
                            numRecipes={item.count}
                            onPress={() => navigation.navigate("Cooks Details", {cookId: item.id})}/>
                    )}/>

                <Text style={styles.heading}>{language("cooks")}</Text>

                <FlatList
                    data={cooks}
                    style={{alignSelf: "stretch"}}
                    renderItem={({item}) => (
                        <CookCard
                            name={item.name}
                            image={item.profilePicture}
                            numRecipes={item.count}
                            onPress={() => navigation.navigate("Cooks Details", {cookId: item.id})}/>
                    )}/>
            </View>
            <FloatingActionButton navigation={navigation} addModalVisible={addModalVisible} setAddModalVisible={setAddModalVisible}/>
            <AddShoppingListModal modalVisible={addModalVisible}
                                  setModalVisible={setAddModalVisible}
                                  token = {DemoToken}
                                  modalTitle={language("newShoppingList")}
                                  buttonTitle={language("add")}
                                  showDeleteOption={false}
                                  goBack={() => navigation.navigate("Shopping List")}
            />
        </View>
    );
}
