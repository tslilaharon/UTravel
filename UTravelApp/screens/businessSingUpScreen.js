// import react & useState
import React, { useState } from "react";
// UI elements
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  SafeAreaView, TouchableWithoutFeedback, CheckBox, Keyboard
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
import { isEmptyData, validateEmail, validatePassword, ConfirmPassword, validateBusinessName, validateOwnerName } from "../utility/validation"
//storge
import { _storeData, _retrieveData ,url} from "../utility/storge"

const SignUpBusiness = ({ navigation }) => {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsCheck, setTermsCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [business, setBusiness] = useState({});

  const SingUpBusinessUser = async () => {
    try {
      console.log("business sing up");
      let res = await fetch(`${url}/bussines/Register`, {
        method: "POST",
        body: JSON.stringify({
          Business_Name: businessName, Owner_Name: ownerName,
          Email: email, Password: password, Terms: termsCheck
        }),
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

    if (isEmptyData(businessName) || isEmptyData(ownerName) ||
      isEmptyData(email) || isEmptyData(password) || isEmptyData(confirmPassword)) {
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
    else if (!validateBusinessName(businessName)) {
      alert("The Business Name is not the appropriate length")
      return
    }
    else if (!validateOwnerName(ownerName)) {
      alert("The Owner Name is not the appropriate length")
      return
    }
    const businessUserData = await SingUpBusinessUser(businessName, ownerName, email, password, termsCheck)

    if (businessUserData != null) {

      setBusiness(businessUserData)
      navigation.navigate("LogInBusinessScreen")
    }
    else {
      alert("The email exists in the system")
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader isValidation={true} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <ScrollView style={basic.container}>

          <Text style={[form.heading, form.field]}>Sign Up</Text>

          <Input
            label="Business Name"
            onChangeText={value => setBusinessName(value)}
            name="businessName"
          />
          <Input
            label="Owner Name"
            onChangeText={value => setOwnerName(value)}
            name="ownerName"
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
              name="confirmPassword"
              secureTextEntry={!showPassword}
              style={form.input} />
            <Ionicons
              onPress={() => setShowPassword(!showPassword)}
              style={form.eye}
              name={showPassword ? "md-eye-off" : "md-eye"} />
          </View>

          <View style={{ flexDirection: 'row', margin: 15 }}>
            <CheckBox
              value={termsCheck}
              onValueChange={setTermsCheck}
              tintColors={{ true: '#5E94E1', false: 'black' }}
              style={form.checkbox}
            />
            <View style={{ marginTop: 2 }}>
              <Text style={form.label}>System Terms and Conditions</Text>
            </View>
          </View>

          <View style={form.field}>
            {termsCheck && (
              <MainButton
                onPress={CheckSignUp}
                content={"Sign up"}
              />
            )}
            {!termsCheck && (
              <MainButton
                onPress={() => navigation.navigate("SignUpBusinessScreen")}
                content={"Sign up"}
              />
            )}
          </View>
          <View style={form.boxLinks}>
            <View style={form.fieldRow}>
              <Text style={form.text}>Are you a registered?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LogInBusinessScreen")}
                style={form.btnLink}>
                <Text style={form.btnBold}>log In now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback >
    </SafeAreaView>
  );
};

export default SignUpBusiness;