import React, {memo} from 'react';
import {FlatList, Text, View} from "react-native";
import styles from "../../styles/styles";
import renderLoading from "../loading/ShowLoader";
import RecipesCardSmall from "./RecipesCardSamll";
import {getIconInfo} from "../HelpFunctions";

function RecipesSearchResult({recipesResult, fetchMore, showLoader2, navigation}) {
    const _renderitem = ({item}) => <RecipesCardSmall title={item.title}
                                                      category={getIconInfo(item.categories)}
                                                      time={item.all_time}
                                                      servings={item.portion}
                                                      photo={item.photo}
                                                      onPress={() => navigation.navigate("Recipe Details", {recipeId: item.id})} />;


    return (
        <View style={{flex: 1, width: "100%", paddingRight: 20}}>
            <Text style={styles.heading}>Всички Рецепти</Text>
            <FlatList
                data={recipesResult}
                keyExtractor={(item, index) => item.id}
                onEndReached={fetchMore}
                onEndReachedThreshold={0.7}
                ListFooterComponent={renderLoading(showLoader2)}
                renderItem={_renderitem}
            />
        </View>
    );
}


export default RecipesSearchResult;
