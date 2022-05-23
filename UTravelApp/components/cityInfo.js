import React from "react";
//styles
import { cityinfo } from "../utility/style/styles"
//ui elements
import { Text, View } from 'react-native';
//icons
import { MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';


const CityInformation = ({ itemData }) => {
    return (
        <View style={cityinfo.box}>
            <Text style={cityinfo.title}>{itemData.Title}</Text>
            <Text style={cityinfo.description}>{itemData.Information}</Text>

            <View style={cityinfo.detailsBox}>
                <Text style={cityinfo.details}><MaterialCommunityIcons name='weather-partly-cloudy' size={20} color='black' />  {itemData.Weather}</Text>
                <Text style={cityinfo.details}><MaterialIcons name='language' size={20} color='black' />  {itemData.language}</Text>
                <Text style={cityinfo.details}><Fontisto name='money-symbol' size={20} color='black' />  {itemData.Currency}</Text>
            </View>
        </View>
    );
}
export default CityInformation;