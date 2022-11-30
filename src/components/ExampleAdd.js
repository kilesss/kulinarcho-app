import React from 'react';
import {Text, View} from "react-native";
import {BannerAd, BannerAdSize} from "react-native-google-mobile-ads";

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
    return (
        <BannerAd
            unitId={'ca-app-pub-3940256099942544/6300978111'}

            // unitId={randAds()}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    );
}

export default ExampleAdd;
