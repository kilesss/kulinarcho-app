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
                    image: <Image source={Images.onBoarding.multiple} style={{height: "73%", width: "115%", marginBottom: -25}}/>,
                    title: 'Кулинарчо',
                    subtitle: 'Най-добрия домашен помощник който може да се събере в джоба ти',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={Images.onBoarding.shoppingLists} style={{height: "65%", width: "110%"}}/>,
                    title: 'Списъци за пазар',
                    subtitle: 'Кулинарчо позволява да създавате списъци за пазар който са винаги достъпни както за вас така и за цялото ви семейство в реално време.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={Images.onBoarding.weekMenu} style={{height: "72%", width: "100%"}}/>,
                    title: 'Седмично меню',
                    subtitle: 'С Кулинарчо вие можете лесно да създадете седмично меню и да ви създаде списък за пазар с всички необходими продукти автоматично.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={Images.onBoarding.recipes1} style={{height: "72%", width: "100%"}}/>,
                    title: 'Рецепти',
                    subtitle: 'С Кулинарчо е по-лесно от всякога да запазвате любимите си рецепти и да ги споделяте с вашите приятели и познати.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={Images.onBoarding.recipes} style={{height: "65%", width: "100%"}}/>,
                    title: 'Първи член в групата',
                    subtitle: 'Можете да създадете група с всички членове на вашето семейство така списъците ви за пазар ще са достъпни за цялото семейство в реално време.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={Images.onBoarding.recipes} style={{height: "67%", width: "100%", marginBottom: -20}}/>,
                    title: 'Добавяне на член',
                    subtitle: 'Нека добавим първия член на вашето семейство. Нужно е да въведете само емайл адреса му и той ще получи емайл с вашата покана (не е нужно да има инсталирано приложение). Можете да управлявате групата си от настройките в профил.',
                },

            ]}
        />
    );
}

export default OnBoarding;
