import React from "react";
//ui elements
import { View, Text, ScrollView, Image } from "react-native";
//styles
import { basic, welcome } from "../utility/style/styles"
//components
import MainButton from '../components/mainButton'
// import AppLoader from '../components/appLoader'

const Welcome = ({ navigation }) => {
  return (
    <>
    <ScrollView style={basic.container}>
      <View style={welcome.logoContainer}>
        <Image source={require("../assets/logo/logo2.png")} style={welcome.image} />
      </View>
      <View>
        <View style={basic.box}>
          <Text style={welcome.title}>Welcome to UTravel!</Text>
          <Text style={welcome.text}>
            We are happy to have you join the UTravel app
            Are you ready for your next trip experience?
          </Text>
        </View>
        <MainButton
          onPress={() => navigation.navigate("LogInScreen")}
          content={"Get Started"} />
      </View>
    </ScrollView>
    {/* <AppLoader/> */}
    </>
  );
};

export default Welcome;