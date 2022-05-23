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

const SettingsScreen = ({ navigation }) => {
    const { setIsLogInUser } = useLogIn()
    const [user, setUser] = useState({});

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            const fetchUser = async () => {
                try {
                    const u = JSON.parse(await _retrieveData("user"))
                    if (isActive) {
                        setUser(u)
                    }
                }
                catch (e) {
                    console.log(e)

                }
            };
            fetchUser();
            return () => {
                isActive = false;
            };
        }, [])
    );

    const LogOut = async () => {
        await _removeData("user")
        await _removeData("Cart")
        await _storeData("IsLogInUser", false)
        setIsLogInUser(false)
        navigation.navigate("WelcomeScreen")
    };

    const deleteUser = async () => {
        try {
            if (user != undefined) {
                await fetch(`${url}/users/delete/${user.User_Id}`, {
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
                    <TouchableOpacity onPress={deleteUser}>
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

export default SettingsScreen;