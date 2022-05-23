import React from 'react';
//styles
import { contactus } from '../utility/style/styles';
import { colors } from '../utility/style/colors';
//ui elements
import {View} from 'react-native';
//icons
import { AntDesign } from '@expo/vector-icons'; 

const SocialMediaBox = () => {
 return (
    <View style={contactus.socialBox}>
        <View style={contactus.socialIcon}>
            <AntDesign name='facebook-square' size={30} color={colors.primary} />
            <AntDesign name='instagram' size={30} color={colors.primary} />
            <AntDesign name='twitter' size={30} color={colors.primary} />
            <AntDesign name='youtube' size={30} color={colors.primary} /> 
        </View>
    </View>
);
}
export default SocialMediaBox;
