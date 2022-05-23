import React from "react";
// ui elements
import { View, Text, TextInput} from "react-native";
//styles
import { form } from "../utility/style/styles";

const Input = (props) => {
 return (
    <View style={form.field}>
    <Text style={form.label}>{props.label}</Text>
    <TextInput
      onChangeText={props.onChangeText}
      placeholder={props.plac}
      keyboardType={props.type}
      maxLength={props.len}
      name={props.name}
      style={form.input}/>
  </View>
);
}
export default Input;




// defaultValue={props.userdata}
