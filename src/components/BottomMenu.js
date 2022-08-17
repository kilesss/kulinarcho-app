
import React from "react";

import {  View, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function BottomMenu(){
      return  <View style={{
            flex: 1, borderTopWidth: 0, borderColor: 'white', width: '110%',
            paddingLeft: 15, marginLeft: 35, marginLeft:0, shadowColor: '#424949', elevation: 5, paddingTop: 15
        }} >
            <View style={{ marginLeft: 5, marginTop: 15,justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', paddingLeft:30,justifyContent: 'center' }}>
                    <TouchableHighlight style={{ flex: 1 }} ><Ionicons name="md-home" size={25} color="#006600" /></TouchableHighlight >
                    <TouchableHighlight style={{ flex: 1 }} ><Ionicons name="md-home" size={25} color="#006600" /></TouchableHighlight >
                    <TouchableHighlight style={{ flex: 1 }} ><Ionicons name="md-home" size={25} color="#006600" /></TouchableHighlight >
                    <TouchableHighlight style={{ flex: 1 }} ><Ionicons name="md-home" size={25} color="#006600" /></TouchableHighlight >
                </View>
            </View>
        </View>
    }
