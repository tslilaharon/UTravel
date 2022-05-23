// import react & useState
import React, { useState } from "react";
//ui elements
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  SafeAreaView, TouchableWithoutFeedback, Keyboard
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
import { isEmptyData, validateEmail, validatePassword, ConfirmPassword, validateUserName } from "../utility/validation"
//storge
import { _storeData ,url } from "../utility/storge"


const SignUp = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);

  const SingUpUser = async () => {
    try {
      let res = await fetch(`${url}/users/Register`, {
        method: "POST",
        body: JSON.stringify({ User_Name: username, Email: email, Password: password }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      let data = await res.json()
      return data;
    }
    catch (error) {
      console.log(error);
    }
  };

  const CheckSignUp = async () => {
    if (isEmptyData(username) || isEmptyData(email) ||
      isEmptyData(password) || isEmptyData(confirmPassword)) {
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
    else if (!ConfirmPassword(password, confirmPassword)) {
      alert("The passwords do not match")
      return
    }
    else if (!validateUserName(username)) {
      alert("The User Name is not the appropriate length")
      return
    }
    const UserData = await SingUpUser(username, email, password)
    if (UserData != null) {
      setUser(UserData)
      navigation.navigate("LogInScreen")
    }
    else {
      alert("The email exists in the system")
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader isValidation={true} />
        <ScrollView style={basic.container}>
          <Text style={[form.heading, form.field]}>Sign Up</Text>
          <Input
            label="User Name"
            onChangeText={value => setUserName(value)}
            name="UserName"
          />
          <Input
            label="Email"
            onChangeText={value => setEmail(value)}
            name="email"
          />
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

          <View style={form.field}>
            <Text style={form.label}>Confirm Password</Text>
            <TextInput
              onChangeText={value => setConfirmPassword(value)}
              name="confirm password"
              secureTextEntry={!showPassword}
              style={form.input} />
            <Ionicons
              onPress={() => setShowPassword(!showPassword)}
              style={form.eye}
              name={showPassword ? "md-eye-off" : "md-eye"} />
          </View>

          <MainButton
            onPress={CheckSignUp}
            content={"Sign Up"}
          />

          <View style={form.boxLinks}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpBusinessScreen")}
              style={form.btnBusiness}>
              <Text style={[form.btnBold, form.btnCenter]}>Register your attraction </Text>
            </TouchableOpacity>

            <View style={form.fieldRow}>

              <Text style={form.text}>Are you a registered user?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LogInScreen")}
                style={form.btnLink}>
                <Text style={form.btnBold}>log in now!</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;