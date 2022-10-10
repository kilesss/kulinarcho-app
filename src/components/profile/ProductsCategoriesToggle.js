import React, {useEffect, useState} from 'react'
import {View, FlatList, SafeAreaView} from 'react-native'
import {ProductCard} from "../display/ProductCard";
import SettingsCardLarge from "./SettingsCardLarge";
import {CustomButton} from "../display/CustomButton";
import language from "../../language/language";
import EditProductTypesModal from "./EditProductTypesModal";
import {getProductTypeIcon} from "../HelpFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getProducts, getProductTypes} from "../../RestRequests/generalRequest";
import renderLoading from "../loading/ShowLoader";


export const ProductsCategoriesToggle = ({condition}) => {
    let content
    let add
    let change

    const [text, setText] = useState("")
    const [modalData, setModalData] = useState('');
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [changeModalVisible, setChangeModalVisible] = useState(false);

    const [product, setProduct] = useState(false)
    const [dismiss, setDismiss] = useState(false)

    const showEdit = (item) => {
        setChangeModalVisible(true)
        setModalData(item)
    };

    const [products, setProducts] = useState([
        // {key: "1", title: "Carrot", icon: "carrot", amount: "100g", color: "#FF7410"},
    ])

    const [showLoader, setShowLoader] = useState(true);
    const [DemoToken, setDemoToken] = useState(true);
    const [productTypes, setProductTypes] = useState([]);
    const [categories, setCategories] = useState();

    function loadData() {
        AsyncStorage.getItem('access_token').then((value) => {
            setDemoToken(value);
            if (value) {
                getProductTypes('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setProductTypes(result)
                        let arr = []
                        result.forEach(item =>
                            arr.push({label: item.name, value: item.id}))

                        setCategories(arr)
                        setShowLoader(false);
                    }
                }).catch((err) => {
                    console.log(err);
                });
                getProducts('GET', value).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setProducts(result)
                        setShowLoader(false);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    useEffect(() => {
        loadData();
        setDismiss(false)
    }, [dismiss]);



    if (condition) {
        add = language("addProduct")
        change = language("edit")
        content = (
            <View style={{alignSelf: "stretch"}}>
                <CustomButton
                    title={add}
                    txtColor={"#fff"}
                    padding={12}
                    onPress={() => {
                        setAddModalVisible(!addModalVisible)
                        setProduct(true)
                    }}
                />
                <SafeAreaView>
                    <FlatList
                        data={products}
                        style={{height: "89%"}}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({item}) => (
                            <ProductCard title={item.name}
                                         textRight={item.amount}
                                         image={getProductTypeIcon(item.types)}
                                         iconColor={item.color}
                                         onPress={() => {
                                             showEdit(item)
                                             setProduct(true)
                                         }}
                            />
                        )}/>
                </SafeAreaView>
            </View>
        )
    } else {
        add = language("addCategory")
        change = language("edit")
        content = (
            <View style={{alignSelf: "stretch"}}>
                <CustomButton
                    title={add}
                    txtColor={"#fff"}
                    padding={12}
                    onPress={() => {
                        setAddModalVisible(!addModalVisible)
                        setProduct(false)
                    }}
                />
                <View>
                <FlatList
                    data={productTypes}
                    numColumns={2}
                    style={{height: "89%"}}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    columnWrapperStyle={{justifyContent: "space-between"}}
                    renderItem={({item}) => (
                        <SettingsCardLarge name={item.name}
                                           image={getProductTypeIcon(item.name)}
                                           onPress={() => {
                                               showEdit(item)
                                               setProduct(false)
                                           }}
                        />
                    )}/>
                </View>
            </View>
        )
    }

    return (renderLoading(showLoader,
        <View style={{alignSelf: "stretch"}}>

            {content}
            <EditProductTypesModal modalVisible={addModalVisible}
                                   setModalVisible={setAddModalVisible}
                                   modalTitle={add}
                                   buttonTitle={language("add")}
                                   showDeleteOption={false}
                                   token={DemoToken}
                                   product={product}
                                   refresh={() => setDismiss(true)}
                                   categories={categories}
            />

            <EditProductTypesModal modalVisible={changeModalVisible}
                                   setModalVisible={setChangeModalVisible}
                                   modalTitle={change}
                                   buttonTitle={change}
                                   showDeleteOption={true}
                                   modalDataName={modalData.name}
                                   modalDataID={modalData.id}
                                   modalDataTypesID={modalData.typesId}
                                   token={DemoToken}
                                   product={product}
                                   refresh={() => setDismiss(true)}
                                   categories={categories}
            />
        </View>
    ));
}
