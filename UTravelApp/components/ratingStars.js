import React from 'react';
//ui elements
import { View } from 'react-native';
//styles
import { general } from "../utility/style/styles";
//icons
import { AntDesign } from '@expo/vector-icons'; 

const RatingStars = (props) => {
    let stars = [];
    for (var i = 1; i <= 5; i++) {
        let typestar = 'star';
        if (i > props.ratings) {
            typestar = 'staro';
        }
        stars.push((<AntDesign name={typestar} size={20} style={general.star} key={i} />));
    }
    return (
        <View style={general.starBox}>
            {stars}
        </View>
    );
}
export default RatingStars;
