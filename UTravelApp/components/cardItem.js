import React, { useState } from "react";
//styles 
import { payment } from "../utility/style/styles";
import { colors } from "../utility/style/colors";
//ui elements
import { Text, View, Image, TouchableOpacity } from 'react-native';
//icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CardItem = ({ itemData, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[payment.ViewSelectes,{borderColor: isSelected ? colors.primary : colors.lightprimary}]}
            onPress={onPress}>
            <View style={payment.icon}>
                <Image
                    resizeMode="center"
                    style={{
                        width: 35,
                        height: 35,
                    }}
                    source={itemData.image} />
            </View>
            <Text style={payment.text}>
                {itemData.name}
            </Text>
            <MaterialCommunityIcons size={24}
                name={isSelected ? "circle-slice-8" : "circle-outline"}
                color={isSelected ? colors.primary : colors.secondary}
            />
        </TouchableOpacity>
    );
}
export default CardItem;