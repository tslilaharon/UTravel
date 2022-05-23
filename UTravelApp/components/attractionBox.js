import React from "react";
//styles
import {attractionbox} from "../utility/style/styles"
//ui elements
import {TouchableOpacity, Text, View, Image} from 'react-native'
//components
import RatingStars from './ratingStars';
//icons
import { Feather } from '@expo/vector-icons';

const AttractionBox = ({itemData ,onPress}) => {
 return (
    <TouchableOpacity onPress={onPress}>
        <View style={attractionbox.imgBox}>
            <View style={attractionbox.absBox}>
                <Image style={attractionbox.imgStyle} source={{ uri: itemData.Image || 'https://hatpakha.com/wp-content/uploads/2019/09/no-image.jpg' }}/>
            </View>
            <Text style={attractionbox.boxTitle}>{itemData.Attraction_Name}</Text>
            <View>
                <RatingStars ratings={itemData.Rating_Star}/>
            </View>
            <View style={attractionbox.hoursBox}>
                  <Text style={attractionbox.hoursText}>{itemData.Open_Hour}</Text>
                  <Text style={attractionbox.hoursText}>{itemData.Close_Hour}</Text>
            </View>
            <Text style={attractionbox.price}><Feather name="dollar-sign" size={18} color='#5E94E1'/>{itemData.Price}</Text>
        </View>
    </TouchableOpacity>
);
}
export default AttractionBox;