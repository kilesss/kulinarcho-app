import React from 'react';
import {Share, View, Button, Text, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons, Octicons} from "@expo/vector-icons";

const ShareButton = () => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <TouchableOpacity style={{paddingHorizontal: 3}} onPress={onShare}>
            <MaterialCommunityIcons name={"share-variant-outline"} size={30} color={"#fff"}/>
        </TouchableOpacity>
    );
};

export default ShareButton;
