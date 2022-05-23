import React from "react";
//styles
import { basic } from "../utility/style/styles";
//ui elements
import {Text, View, TouchableOpacity} from 'react-native';

const MainButton = (props) => {
 return (
    <View style={basic.box}>
        <TouchableOpacity 
            onPress={props.onPress}
            style={basic.btnMain}>
            <Text style={basic.btnText}>{props.content}</Text>
        </TouchableOpacity>
  </View>
);
}
export default MainButton;