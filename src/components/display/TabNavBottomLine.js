import React from 'react';
import {LinearGradient} from "expo-linear-gradient";

function TabNavBottomLine() {
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['#0a8f45', 'rgba(21,160,81,0.45)']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}

            style={{height: 6, marginTop: 15, width: 55, marginBottom: -17, borderRadius: 10}}
        />
    );
}

export default TabNavBottomLine;
