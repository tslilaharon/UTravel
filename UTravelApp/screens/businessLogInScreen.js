//import react & useState
import React, { useState } from "react";
// ui elements
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  SafeAreaView, TouchableWithoutFeedback, Keyboard
} from "react-native";
//icons
import { Ionicons } from "@expo/vector-icons";
//styles
import { basic, form } from "../utility/style/styles"
//components
import Input from '../components/input'
import MainButton from '../components/mainButton'
import CustomHeader from '../components/customHeader'
//validation
import {
  isEmptyData, validateEmail,
  validatePassword, EmptyArr
} from "../utility/validation"
//storge
import { _storeData, url } from "../utility/storge"

const LogInBusiness = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [business, setBusiness] = useState({});

  const LoginBusiness = async () => {
    let res = await fetch(`${url}/bussines/Login`, {
      method: "POST",
      body: JSON.stringify({ Email: email, Password: password }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    let data = await res.json()
    if (!EmptyArr(data)) {
      return data[0]
    }
    return
  };

  const isLogIn = async () => {

    if (isEmptyData(email) || isEmptyData(password)) {
      alert("One of the Inputs is empty")
      return
    }
    else if (!validateEmail(email)) {
      alert("The email is invalid")
      return
    }
    else if (!validatePassword(password)) {
      alert("The password is not the appropriate length")
      return
    }
    const businessData = await LoginBusiness(email, password)
    if (businessData != null) {
      setBusiness(businessData)
      _storeData('business', businessData)
      _storeData("IsLogInBusiness", true)
      navigation.navigate("BusinessProfileScreen")
    }
    else {
      _storeData("IsLogInBusiness", false)
      alert("Incorrect email and password")
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader isValidation={true} />
        <ScrollView style={basic.container}>
          <Text style={[form.heading, form.field]}>Log In</Text>
          <Input
            label="Email"
            onChangeText={value => setEmail(value)}
            name="email" />

          <View style={form.field}>
            <Text style={form.label}>Password</Text>
            <TextInput
              onChangeText={value => setPassword(value)}
              name="password"
              secureTextEntry={!showPassword}
              style={form.input} />
            <Ionicons
              onPress={() => setShowPassword(!showPassword)}
              style={form.eye}
              name={showPassword ? "md-eye-off" : "md-eye"} />
          </View>

          <MainButton
            onPress={isLogIn}
            content={"Log In"} />

          <View style={form.boxLinks}>
            <View style={form.fieldRow}>
              <Text style={form.text}>Not Registered yet?</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("SignUpBusinessScreen")}
                style={form.btnLink}>
                <Text style={form.btnBold}>Sign up now!</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
              style={form.btnLink}>
              <Text style={form.text}>forgot your password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LogInBusiness;