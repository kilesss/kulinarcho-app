import React, {useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles";
import {CustomButton} from "../../components/display/CustomButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function WeekMenuCreate({navigation}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [text, setText] = useState('');

    const [dateStart, setDateStart] = useState('Начална Дата');
    const [dateEnd, setDateEnd] = useState('Крайна Дата');


    const handleConfirmStart = (date) => {
        const formattedDate = `${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getFullYear()}`
        setDateStart(formattedDate)
        setDatePickerVisibility(false);
    };

    const handleConfirmEnd = (date) => {
        const formattedDate = `${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getFullYear()}`
        setDateEnd(formattedDate)
        setDatePickerVisibility2(false);
    };


    return (

        <View style={styles.container}>
            <View style={{alignSelf: "stretch"}}>

                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{width: "48%"}}>
                        {/*<CustomButton*/}
                        {/*    title={dateStart}*/}
                        {/*    onPress={() => setDatePickerVisibility(true)}*/}
                        {/*    bgColor={"#ffffff"}*/}
                        {/*    txtColor={"#b0b0b0"}*/}
                        {/*    padding={12}*/}
                        {/*/>*/}
                        <TouchableOpacity style={{...styles.customButton, padding: 15}} onPress={() => setDatePickerVisibility(true)}>
                            <Text style={styles.subHeading}>{dateStart}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: "48%"}}>
                        <TouchableOpacity style={{...styles.customButton, padding: 15}} onPress={() => setDatePickerVisibility2(true)}>
                            <Text style={styles.subHeading}>{dateEnd}</Text>
                        </TouchableOpacity>
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
                onConfirm={handleConfirmStart}
                onCancel={() => setDatePickerVisibility(false)}
            />

            <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                mode="date"
                onConfirm={handleConfirmEnd}
                onCancel={() => setDatePickerVisibility2(false)}
            />
        </View>
    );
}

export default WeekMenuCreate;
