import React from "react";
//styles
import {openinghours} from "../utility/style/styles";
//ui elements
import {Text, View} from 'react-native';

const OpeningHours = ({itemData}) => {
 return (
  <View style={openinghours.box}>
    <Text style={openinghours.title}>Opening Hours</Text>
    <View style={openinghours.hoursBox}>
      <Text style={openinghours.hourText}>{itemData.Open_Hour}</Text>
      <Text style={openinghours.hourText}>{itemData.Close_Hour}</Text>
    </View>
  </View>
);
}
export default OpeningHours;