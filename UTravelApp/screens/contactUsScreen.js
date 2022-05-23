// import react & useState
import React, { useState } from "react";
// ui elements
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
// styles
import { contactus } from "../utility/style/styles"
// components
import Input from '../components/input'
import MainButton from '../components/mainButton'
import SocialMediaBox from '../components/socialMediaBox'
import CustomHeader from '../components/customHeader'
import { url } from '../utility/storge'
import {
    isEmptyData, validateEmail,
    validateUserName, defaultImage
} from "../utility/validation"

const ContactUs = ({ navigation }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("Submit");

    const handleSubmit = async (event) => {
        //event.preventDefault();
        setStatus("Sending...");
        let details = {
            name: name,
            email: email,
            message: message,
        };
        let response = await fetch(`${url}/users/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        });
        setStatus("Submit");
        let result = await response.json();
        alert(result.status);
    };

    const Checkdetails = async () => {
        if (isEmptyData(email) || isEmptyData(name) || isEmptyData(message)) {
            alert("One of the Inputs is empty")
            return
        }
        else if (!validateEmail(email)) {
            alert("The email is invalid")
            return
        }
        handleSubmit()
        navigation.navigate('HomeScreen')
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isMain={true} navigation={navigation} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={contactus.container}>
                    <Text style={[contactus.heading, contactus.field]}>Contact Us</Text>
                    <View style={contactus.fieldRow}>
                        <Text style={contactus.titleDetails}>Email</Text>
                        <Text style={contactus.titleDetails}>Phone</Text>
                    </View>
                    <View style={contactus.fieldRow}>
                        <Text style={contactus.details}>utravel010@gmail.com</Text>
                        <Text style={contactus.details}>050-0000000</Text>
                    </View>
                    <View style={contactus.messsageBox}>
                        <Input
                            label="Name"
                            onChangeText={value => setName(value)}
                            name="name"
                        />
                        <Input
                            htmlFor="email"
                            label="Email"
                            onChangeText={value => setEmail(value)}
                            name="email"
                        />
                        <View style={contactus.field}>
                            <Text style={contactus.label}>Message</Text>
                            <TextInput
                                htmlFor="message"
                                onChangeText={value => setMessage(value)}
                                name="message"
                                style={[contactus.input, { textAlignVertical: 'top' }]}
                                multiline={true}
                                numberOfLines={10}
                                maxLength={100}
                            />
                        </View>
                        <MainButton
                            onPress={Checkdetails}
                            content={"Send"}
                        />
                    </View>
                    <SocialMediaBox />
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>

    );
};

export default ContactUs;