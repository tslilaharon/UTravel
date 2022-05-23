import React from "react";
//styles
import { popularcitys } from "../utility/style/styles";
//ui elements
import {TouchableOpacity, Text, View, Image} from 'react-native';

const PopularDestinations = ({itemData, onPress}) => {
 return (
    <TouchableOpacity onPress={onPress}>
        <View style={popularcitys.imgBox}>
            <View style={popularcitys.absBox}>
                    <Image style={popularcitys.imgStyle} source={{ uri: itemData.Image }} key={itemData.City_Id}/>
                    <View style={popularcitys.BoxOverlay}></View>
            </View>
            <Text style={popularcitys.boxText}>{itemData.City_Name}</Text>
        </View>
    </TouchableOpacity>
    );
}
export default PopularDestinations;
