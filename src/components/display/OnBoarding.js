import React, {useRef} from 'react';
import {Image, View} from "react-native";
import {CustomButton} from "./CustomButton";
import Images from "../../../public/images";
import Onboarding from "react-native-onboarding-swiper";


function OnBoarding({closeOnBoardingModal}) {
    const onboardingRef = useRef(null);
    const Next = (...props) => (
        <View style={{width: 95, marginRight: 25}}>
            <CustomButton title={"Напред"} txtColor={'#fff'} padding={5} onPress={() => onboardingRef.current.goNext()}/>
        </View>
    );
    return (
        <Onboarding
            ref={onboardingRef}
            bottomBarHeight={70}
            imageContainerStyles={{paddingHorizontal: 25, marginTop: "-22%", marginBottom: "-70%"}}
            titleStyles={{marginTop: 20, marginBottom: -20}}
            subTitleStyles={{paddingHorizontal: 20}}
            bottomBarColor={'#fff'}
            skipLabel={"Пропусни"}
            onSkip={() => closeOnBoardingModal()}
            onDone={() => closeOnBoardingModal()}

            NextButtonComponent={Next}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={Images.onBoarding.multiple} style={{height: "72%", width: "115%", marginBottom: -20}}/>,
                    title: 'Кулинарчо',
                    subtitle: 'Най-добрия домашен помощник който може да се събере в джоба ти',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={Images.onBoarding.recipes} style={{height: "72%", width: "100%"}}/>,
                    title: '2',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={Images.onBoarding.recipes} style={{height: "72%", width: "100%"}}/>,
                    title: '3',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={Images.onBoarding.recipes} style={{height: "72%", width: "100%"}}/>,
                    title: '4',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={Images.onBoarding.recipes} style={{height: "72%", width: "100%"}}/>,
                    title: '5',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
            ]}
        />
    );
}

export default OnBoarding;
