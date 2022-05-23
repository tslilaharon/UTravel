// import react & useState
import React, { useState, useEffect } from "react";
// ui elements
import {
  SafeAreaView, View, Text, TextInput, ScrollView,
  TouchableOpacity, TouchableWithoutFeedback, Keyboard
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
//validation
import { isEmptyData, validateEmail, validatePassword, EmptyArr } from "../utility/validation"
//storge
import { _retrieveData, _storeData, url } from "../utility/storge"
import { useLogIn } from '../utility/LogInContext'

const LogIn = ({ navigation }) => {

  const { setIsLogInUser } = useLogIn()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({});


  const LoginUser = async () => {
    try {
      let res = await fetch(`${url}/users/login`, {
        method: "POST",
        body: JSON.stringify({ Email: email, Password: password }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (res.status == 200) {
        let data = await res.json()
        if (!EmptyArr(data)) {
          return data[0]
        }
      }
      else {
        return null
      }
    }
    catch (error) {
      console.log(error)
    }
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
    const UserData = await LoginUser(email, password)
    if (UserData != null) {
      setUser(UserData)
      _storeData("user", UserData)
      _storeData("IsLogInUser", true)
      navigation.navigate("HomeScreen")
    }
    else {
      _storeData("IsLogInUser", false)
      alert("Incorrect email and password")
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader isValidation={true} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
            content={"Login"} />


          <View style={form.boxLinks}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpBusinessScreen")}
              style={form.btnBusiness}>
              <Text style={[form.btnBold, form.btnCenter]}>Register your business </Text>
            </TouchableOpacity>
            
            <View style={form.fieldRow}>
              <Text style={form.text}>Not Registered yet?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUpScreen")}
                style={form.btnLink}>
                <Text style={form.btnBold}>Sign up now!</Text>
              </TouchableOpacity>
            </View>

            <View style={form.fieldRow}>
              <Text style={form.text}>Are you a member business?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LogInBusinessScreen")}
                style={form.btnLink}>
                <Text style={form.btnBold}>Log In</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
              style={form.btnLink}>
              <Text style={form.text}>Forgot your password?</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </TouchableWithoutFeedback >
    </SafeAreaView>
  );
};

export default LogIn;