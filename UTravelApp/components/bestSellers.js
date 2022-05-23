import React from 'react';
//styles
import { popularattractions } from '../utility/style/styles';
import { colors } from "../utility/style/colors";
//ui elements
import { TouchableOpacity, Text, View, Image } from 'react-native';
//icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BestSellers = ({ itemData, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={popularattractions.imgBox}>
                <View style={popularattractions.absBox}>
                    <Image style={popularattractions.imgStyle} source={{ uri: itemData.Image }} key={itemData.Attraction_Id} />
                    <View style={popularattractions.BoxOverlay}></View>
                </View>
                <Text style={popularattractions.boxTitle}>{itemData.Attraction_Name}</Text>
                <Text style={popularattractions.boxText}>
                    <MaterialCommunityIcons name='google-maps' size={15} color={colors.white} /> {itemData.City_Name}
                    </Text>
            </View>
        </TouchableOpacity>
    );
}
export default BestSellers;
