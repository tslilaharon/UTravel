import React from 'react';
//styles
import { allcities } from '../utility/style/styles';
import { colors } from '../utility/style/colors';
//ui elements
import { TouchableOpacity, Text, View, Image } from 'react-native';
//icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CitiesBox = ({ itemData, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={allcities.imgBox}>
                <View style={allcities.absBox}>
                    <Image style={allcities.imgStyle} source={{ uri: itemData.Image }} key={itemData.City_Id} />
                </View>
                <View style={allcities.BoxOverlay}></View>
                <View style={allcities.textBox}>
                    <Text style={allcities.name}>{itemData.City_Name}</Text>
                    <Text style={allcities.country}>
                        <MaterialCommunityIcons name='google-maps' size={15} color={colors.aqua}/> {itemData.Country}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default CitiesBox;

