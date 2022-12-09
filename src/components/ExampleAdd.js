import React from 'react';
import {Text, View} from "react-native";
import {BannerAd, BannerAdSize} from "react-native-google-mobile-ads";


const dev = true;
function ExampleAdd({height}) {
    let addKeys = [
        'ca-app-pub-5428132222163769/6832450395',
        'ca-app-pub-5428132222163769/5519368721',
        'ca-app-pub-5428132222163769/1580123713',
        'ca-app-pub-5428132222163769/2434379692',
        'ca-app-pub-5428132222163769/6640878703',
        'ca-app-pub-5428132222163769/3603651826',
        'ca-app-pub-5428132222163769/7686706377',
        'ca-app-pub-5428132222163769/9977488485',
        ]
    function randAds(){
        var RandomNumber = Math.floor(Math.random() * 8);
    return addKeys[RandomNumber];
    }
    function showDev(){
        if (dev === true){
            return <View></View>
        }else{
            return <BannerAd
                unitId={randAds()}

                // unitId={randAds()}
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        }
    }
    return (showDev());
}

export default ExampleAdd;
