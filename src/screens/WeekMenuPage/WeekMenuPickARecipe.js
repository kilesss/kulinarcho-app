import React, {useState,useEffect} from 'react';
import {FlatList, Text, View} from "react-native";
import styles from "../../styles/styles";
import DropDownPicker from "react-native-dropdown-picker";
import {RecipesCardSmall} from "../../components/recipes/RecipesCardSmall";
import {getIconInfo, getProductTypeIcon} from "../../components/HelpFunctions";
import {ProductCard} from "../../components/display/ProductCard";
import Images from "../../../public/images";
import language from "../../language/language";
import {CustomButton} from "../../components/display/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getSingleRecipe, getUserRecipes} from "../../RestRequests/generalRequest";

function WeekMenuPickARecipe({route, navigation}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [title, settitle] = useState('');
    const [catTitle, setcatTitle] = useState('');
    const [category, setcategory] = useState('');
    const [photo, setphoto] = useState('');
    const [allTIme, setallTIme] = useState('');
    const [portions, setportions] = useState('');
    const [publicRec, setpublicRec] = useState('');
    const [items, setItems] = useState([]);
    const [id, setid] = useState('');
    const [products, setproducts] = useState([]);
    const [date, setDate] = useState([]);


    // const products = [
    //     {title: "Банан", image: Images.productCategory.fruitVeg, textRight: "200 г."},
    //     {title: "Моркови", image: Images.productCategory.fruitVeg, textRight: "200 г."},
    //     {title: "Банан", image: Images.productCategory.fruitVeg, textRight: "200 г."},
    //     {title: "Банан", image: Images.productCategory.fruitVeg, textRight: "200 г."}
    // ]
    useEffect(() => {

        loadData();
    }, []);

    function loadData() {
        setDate(route.params.date)
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                getUserRecipes(value).then(data => {
                    if(data){
                        var newData = [];
                        Object.keys(data).map(key => {
                            newData.push({
                                label:data[key].title,
                                value:data[key].id
                            })
                        })

                        setItems(newData)

                    }
                })
            }
        }, []);
    }


    function getRecipeId(recipeId) {
        AsyncStorage.getItem('access_token').then((value) => {
            if (value) {
                getSingleRecipe('GET', value, recipeId).then(data => {
                    if (data) {
                        const result = Object.values(data);
                        setcatTitle(result[0].catTitle);
                        setid(result[0].id);
                        settitle(result[0].title);
                        setallTIme(result[0].all_time);
                        setphoto(result[0].photo);
                        setcategory(result[0].categories);
                        setportions(result[0].portion);
                        setpublicRec(result[0].public);
                        var products = [];
                        Object.keys(result[1]).map(function(key) {
                            var title = result[1][key].productName;
                            var category = result[1][key].catName;
                            var ing = result[1][key].volume+' '+result[1][key].unitsName;
                            if (result[1][key].hint !== '' && result[1][key].hint !== null){
                                title = title+' ('+result[1][key].hint+')';
                            }
                            products.push({
                                title: title, catName: category, textRight: ing
                            })
                        })
                        console.log(products)
                        setproducts(products);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, []);
    }

    function goBackFunction(){
        setWeekMenu().then(r => {
            navigation.navigate("Week Menu Add Recipes")
        });
    }

    async function setWeekMenu() {
       await AsyncStorage.getItem('weekMenu').then(async (value) => {
           let oldData = []
           if (value !== null) {
               oldData = JSON.parse(value);
           }

           if (date !== '' && title !==''){
               oldData.push({
                   date: date,
                   id: id,
                   title: title,
                   photo: photo,
                   category: category,
                   allTime: allTIme,
                   portions: portions,
                   publicRec:publicRec
               });
               await AsyncStorage.setItem('weekMenu', JSON.stringify(oldData)).then();
           }
       })

    }
    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                onSelectItem={(item) => {
                    getRecipeId(item.value)
                }}
                setItems={setItems}
                setOpen={setOpen}
                setValue={setValue}
                listMode={"SCROLLVIEW"}
                listItemLabelStyle={{
                    color: "#4B4C4C",
                }}
                style={{...styles.customButton, padding: 10, borderWidth: 0, marginBottom: 10}}
                dropDownContainerStyle={{
                    borderWidth: 0,
                    elevation: 3,
                    shadowColor: "#888",
                }}
            />
            {title === ''? '':

            <RecipesCardSmall
                title={title}
                time={allTIme}
                servings={portions}
                publicStatus={publicRec}
                photo={photo}
                category={getIconInfo(category)}/>
                }
            <Text style={styles.heading}>Нужни Продукти</Text>
            <FlatList
                data={products}
                style={{alignSelf: "stretch"}}
                renderItem={({item}) => (
                    <ProductCard title={item.title} image={getProductTypeIcon(item.catName)} textRight={item.textRight} />
                )}/>

            <View style={{flexDirection: "row", alignItems: "center", alignSelf: "flex-end"}}>
                <Text style={{...styles.subHeading, marginRight: 10}}>{language("cancel")}</Text>
                <CustomButton title={language("add")} txtColor={"#fff"} onPress={() => goBackFunction()}/>
            </View>

        </View>
    );
}

export default WeekMenuPickARecipe;
