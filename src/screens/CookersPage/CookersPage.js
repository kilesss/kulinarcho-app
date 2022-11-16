import React, {useEffect, useState} from "react";
import {FlatList, Text, View} from "react-native";
import styles from '../../styles/styles'
import CookCard from "../../components/display/CookCard";
import language from "../../language/language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFollower, getProducts, getProductTypes, getPublicProfiles} from "../../RestRequests/generalRequest";
import FloatingActionButton from "../../components/display/FloatingActionButton";
import AddShoppingListModal from "../../components/shoppingList/AddShoppingListModal";
import {useIsFocused} from '@react-navigation/native'
import renderLoading from "../../components/loading/ShowLoader";
import ExampleAdd from "../../components/ExampleAdd";

export default function CookersPage({navigation}) {
    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);
    const [cooks, setCooks] = useState([]);
    const [cooksFollowing, setCooksFollowing] = useState();
    const [addModalVisible, setAddModalVisible] = useState(false);
    const isFocused = useIsFocused();

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
                    if (data) {
                        setCooksFollowing(Object.values(data.response))
                        setShowLoader(false);
                    }
                })
            }
        }, []);
    }

    useEffect(() => {
        loadData();

    }, [isFocused]);

    return (renderLoading(showLoader,
        <View style={{flex: 1}}>
            <View style={{marginHorizontal: 20, marginVertical: 10}}>
                <Text style={styles.heading}>{language("cooksFollowing")}</Text>

                <FlatList
                    data={cooksFollowing}
                    style={{alignSelf: "stretch"}}
                    renderItem={({item, index}) => (
                        <View>
                            {index !== 0 && index % 4 === 0 ? <ExampleAdd height={55}/> : ''}
                            <CookCard
                                name={item.name}
                                image={item.profilePicture}
                                numRecipes={item.count}
                                onPress={() => navigation.navigate("Cooks Details", {cookId: item.id})}/>
                        </View>
                    )}/>
                {cooksFollowing ? cooksFollowing.length < 4 ? <ExampleAdd height={55}/> : '' : ''}

                <Text style={styles.heading}>{language("cooks")}</Text>

                <FlatList
                    data={cooks}
                    style={{alignSelf: "stretch"}}
                    renderItem={({item, index}) => (
                        <View>
                            {index !== 0 && index % 4 === 0 ? <ExampleAdd height={55}/> : ''}
                            <CookCard
                                name={item.name}
                                image={item.profilePicture}
                                numRecipes={item.count}
                                onPress={() => navigation.navigate("Cooks Details", {cookId: item.id})}/>
                        </View>

                    )}/>

                {cooks ? cooks.length < 4 ? <ExampleAdd height={55}/> : '' : ''}

            </View>
            <FloatingActionButton navigation={navigation} addModalVisible={addModalVisible}
                                  setAddModalVisible={setAddModalVisible}/>
            <AddShoppingListModal modalVisible={addModalVisible}
                                  setModalVisible={setAddModalVisible}
                                  token={DemoToken}
                                  modalTitle={language("newShoppingList")}
                                  buttonTitle={language("add")}
                                  showDeleteOption={false}
                                  goBack={() => navigation.navigate("Shopping List")}
            />
        </View>
    ));
}
