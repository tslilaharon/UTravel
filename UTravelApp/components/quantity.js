import React from "react";
//styles
import {quantity} from "../utility/style/styles";
//ui elements
import {Text, View, TouchableOpacity} from 'react-native';
//icons
import { AntDesign } from '@expo/vector-icons';

const Quantity = (props) => {
 return (
    <View style={quantity.container}>
        <View style={quantity.box}>
            <TouchableOpacity style={quantity.quantityBtn} onPress={props.onPressminus}>
                <AntDesign name="minus" size={15} color="#707070" />
            </TouchableOpacity>
            <Text style={{color: '#707070', fontWeight: 'bold'}}>{props.content}</Text>
            <TouchableOpacity style={quantity.quantityBtn} onPress={props.onPressplus}>
                <AntDesign name="plus" size={15} color="#707070" />
            </TouchableOpacity>
        </View>
    </View>
    );
}
export default Quantity;