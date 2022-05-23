import React from "react";
//styles
import { headercity } from "../utility/style/styles";
import { colors } from "../utility/style/colors";
//ui elements
import {Text, View, Image} from 'react-native';
//icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
 
const HeaderCity = ({itemData}) => {
 return (
    <View>
        <Image source={{ uri: itemData.Image }} style={{ width: '100%', height: 300 , borderBottomRightRadius:15, borderBottomLeftRadius:15}}/>
        <View style={headercity.box}>
            <Text style={headercity.title}>{itemData.City_Name}</Text>
            <Text style={headercity.country}>
                <MaterialCommunityIcons name='google-maps' size={15} color={colors.white} />
                 {itemData.Country}
            </Text>
        </View>
    </View>
    );
}
export default HeaderCity;