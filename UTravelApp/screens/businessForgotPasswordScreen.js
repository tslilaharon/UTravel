//import react & useState
import React, { useState } from "react";
//ui elements
import {
  View, Text, TextInput, SafeAreaView,
  TouchableWithoutFeedback, Keyboard
}
  from "react-native";
//icons
import { Ionicons } from "@expo/vector-icons";
//styles
import { basic, form } from "../utility/style/styles"
//components
import Input from '../components/input'
import MainButton from '../components/mainButton'
import CustomHeader from '../components/customHeader'
import { isEmptyData, validateEmail } from '../utility/validation';
import { _storeData, _retrieveData, url } from '../utility/storge';

const ForgotPasswordBusiness = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const resetPassword = async (email) => {
    let res = await fetch(`${url}/bussines/forgotpassword`, {
      method: "PUT",
      body: JSON.stringify({ Email: email }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    let data = await res.json()
    if (data.Status == 'ok') {
      alert("Password Reset Successfully")
      navigation.navigate('LogInScreen')
    }
    else {
      alert("Error,try again later")
    }
  }

  const Checkdetails = async () => {
    if (isEmptyData(email)) {
      alert('One of the Inputs is empty')
      return
    }
    else if (!validateEmail(email)) {
      alert("The email is invalid")
      return
    }
    resetPassword(email)
  }


  // כצריך לעדכן כבר את הסיסמא שאנחנו מייצרים לתוך הדאטה בייס ,ואז רק לשלוח למשתמש את הסיסמא במייל
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader isValidation={true} />
        <View style={basic.container}>

          <Text style={[form.heading, form.field]}>Forgot Password - Business</Text>
          {/* <Text style={}>Enter your email to reset your password in easy</Text> */}

          <Input
            label="Email"
            onChangeText={value => setEmail(value)}
            name="email"
          />

          <MainButton
            //onPress={() => navigation.navigate("LoginScreen")}
            onPress={Checkdetails}
            content={"Send"}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordBusiness;