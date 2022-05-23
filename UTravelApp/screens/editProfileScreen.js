// import react & useState
import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
// ui elements
import {
    View, Text, ImageBackground, ScrollView, TouchableOpacity,
    SafeAreaView, TouchableWithoutFeedback, Keyboard
}
    from "react-native";
//styles
import { profile, form, allcities } from "../utility/style/styles";
import { colors } from "../utility/style/colors"
//components
import Input from '../components/input'
import MainButton from '../components/mainButton'
import CustomHeader from '../components/customHeader'
//validation
import {
    isEmptyData, validateEmail,
    validateUserName, defaultImage
} from "../utility/validation"
//storge
import { _storeData, _retrieveData, url } from "../utility/storge"
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({ navigation }) => {

    const [user, setUser] = useState({});
    const [username, setUserName] = useState(user.User_Name);
    const [email, setEmail] = useState(user.Email);
    const [image, setImage] = useState(user.Image);
    const [isLoading, setIsLoading] = useState(false);

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
        }, [user])
    );

    const EditProfileUser = async (id, email, name, image) => {
        await fetch(`${url}/users/edit/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                id: id, Email: email, User_Name: name,
                Image: image
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };
    const UserByID = async () => {
        let res = await fetch(`${url}/users/${user.User_Id}`)
        let data = await res.json()
        return data
    };

    const Checkdetails = async () => {
        if (isEmptyData(email) || isEmptyData(username)) {
            alert("One of the Inputs is empty")
            return
        }
        else if (!validateUserName(username)) {
            alert("The User Name is not the appropriate length")
            return
        }
        else if (!validateEmail(email)) {
            alert("The email is invalid")
            return
        }
        let img = defaultImage(image, user.Image)
        setImage(img)

        await EditProfileUser(user.User_Id, email, username, img)
        const UserData = await UserByID(user.User_Id)
        if (UserData != null) {
            setUser(UserData)
            _storeData("user", UserData)
            navigation.navigate("ProfileScreen")
        }
    };

    const _pickImage = async () => {
        setIsLoading(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true
        });
        if (!result.cancelled) {
            setImage(result.base64);
            UploadImage(result.base64);
        }
        setIsLoading(false)
    };

    const UploadImage = async (file) => {
        let res = await fetch(`${url}/users/upload`, {
            method: 'post',
            body: JSON.stringify({
                photo: file
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let data = await res.json()
        setImage(data.img)
        setIsLoading(false)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader isMain={false} navigation={navigation} />
                <ScrollView style={profile.container}>
                    <Text style={[form.heading, form.field]}>Edit Profile</Text>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={_pickImage}>
                            {isLoading && <View style={allcities.containerBox}>
                                <Text style={allcities.label}>Loading...</Text>
                            </View>}
                            {!isLoading && <ImageBackground
                                source={{ uri: image || user.Image }}
                                style={{
                                    height: 150, width: 150, margin: 5, borderRadius: 90,
                                    borderWidth: 2, borderColor: colors.primary
                                }}
                                imageStyle={{ borderRadius: 90, margin: -2, }}>
                            </ImageBackground>}
                        </TouchableOpacity>
                    </View>

                    <View style={profile.container}>
                        <Input
                            label="User Name"
                            onChangeText={value => setUserName(value)}
                            userdata={username}
                            name="name"
                        />
                        <Input
                            label="Email"
                            type="email-address"
                            onChangeText={value => setEmail(value)}
                            name="email"
                        />
                        <MainButton
                            onPress={Checkdetails}
                            content={"Update"} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default EditProfile;