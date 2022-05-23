import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
//ui elements
import { Text, SafeAreaView, TouchableOpacity, View } from "react-native";
//styles
import { settings } from "../utility/style/styles"
//icons
import { Entypo } from '@expo/vector-icons';
//components
import CustomHeader from '../components/customHeader'
//storge
import { _removeData, _retrieveData, _storeData, url } from "../utility/storge"
import { useLogIn } from '../utility/LogInContext'

const BusinessSettingsScreen = ({ navigation }) => {

    const [business, setBusiness] = useState({});
    const { setIsLogInBusiness } = useLogIn()

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            const fetchBusiness = async () => {
                try {
                    const b = JSON.parse(await _retrieveData("business"))
                    if (isActive) {
                        setBusiness(b)
                    }
                }
                catch (e) {
                    console.log(e)
                }
            };
            fetchBusiness();
            return () => {
                isActive = false;
            };
        }, [])
    );

    const LogOut = async () => {
        await _removeData("business")
        await _storeData("IsLogInBusiness", false)
        setIsLogInBusiness(false)
        navigation.navigate("WelcomeScreen")
    };
    const deleteBusiness = async () => {
        try {
            if (business != undefined) {
                await fetch(`${url}/bussines/delete/${business.Business_Id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                LogOut()
            }
        }
        catch (e) {
            console.log(e)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isBusiness={true} navigation={navigation} />
            <View style={settings.container}>
                <View style={settings.boxView}>
                    <Text style={settings.label}>Settings</Text>
                    <TouchableOpacity onPress={LogOut}>
                        <View style={settings.iconMenu}>
                            <Entypo name="log-out" size={25} color="black" />
                            <Text style={settings.text}>Log Out My profile</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteBusiness}>
                        <View style={settings.iconMenu}>
                            <Entypo name="remove-user" size={25} color="black" />
                            <Text style={settings.text}>Remove My profile</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default BusinessSettingsScreen;