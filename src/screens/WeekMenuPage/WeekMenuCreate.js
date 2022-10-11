import React, {useState} from 'react';
import {Button, TextInput, View} from "react-native";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function WeekMenuCreate({navigation}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [text, setText] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        hideDatePicker();
    };


    return (

        <View style={styles.container}>
            <View style={{alignSelf: "stretch"}}>

                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{width: "48%"}}>
                        <CustomButton
                            title="Начална Дата"
                            onPress={showDatePicker}
                            bgColor={"#ffffff"}
                            txtColor={"#b0b0b0"}
                            padding={12}
                        />
                    </View>
                    <View style={{width: "48%"}}>
                        <CustomButton
                            title="Крайна Дата"
                            onPress={showDatePicker}
                            bgColor={"#ffffff"}
                            txtColor={"#b0b0b0"}
                            padding={12}
                        />
                    </View>
                </View>

                <TextInput
                    style={{...styles.customButton, padding: 12}}
                    placeholder={"Име"}
                    onChangeText={text => setText(text)}
                />
                <CustomButton
                    title={"Генерирай Меню"}
                    txtColor={"#fff"}
                    onPress={() => navigation.navigate("Week Menu Add Recipes", {title: text})}
                />
            </View>


            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

export default WeekMenuCreate;
