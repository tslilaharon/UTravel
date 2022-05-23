// import react & useState
import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
// ui elements
import {
    View, Text, ImageBackground, ScrollView, SafeAreaView,
    TouchableWithoutFeedback, Keyboard, TouchableOpacity
}
    from "react-native";
//styles
import { profile, form, allcities } from "../utility/style/styles";
import { colors } from "../utility/style/colors"
//components
import CustomHeader from '../components/customHeader'
import Input from '../components/input'
import MainButton from '../components/mainButton'
//validation
import {
    isEmptyData, validateEmail, validateBusinessName,
    validateOwnerName, defaultImage
} from "../utility/validation"
//storge
import { _storeData, _retrieveData, url } from "../utility/storge"

import * as ImagePicker from 'expo-image-picker';

const BusinessEditProfile = ({ navigation }) => {

    const [business, setBusiness] = useState({});
    const [businessName, setBusinessName] = useState(business.Business_Name);
    const [ownerName, setOwnerName] = useState(business.Owner_Name);
    const [email, setEmail] = useState(business.Email);
    const [image, setImage] = useState(business.Image);
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            const fetchUser = async () => {
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
            fetchUser();
            return () => {
                isActive = false;
            };
        }, [business])
    );

    const EditProfile = async () => {
        await fetch(`${url}/bussines/Edit/${business.Business_Id}`, {
            method: "PUT",
            body: JSON.stringify({
                id: business.Business_Id, Business_Name: businessName,
                Owner_Name: ownerName, Email: email, Image: image
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };

    const BussinesByID = async () => {
        let res = await fetch(`${url}/bussines/${business.Business_Id}`)
        let data = await res.json()
        return data
    };

    const Checkdetails = async () => {
        if (isEmptyData(email) || isEmptyData(ownerName) || isEmptyData(businessName)) {
            alert("One of the Inputs is empty")
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
        else if (!validateEmail(email)) {
            alert("The email is invalid")
            return
        }
        let img = defaultImage(image , business.Image)
        setImage(img)

        await EditProfile(business.Business_Id, businessName, ownerName, email, image)
        const BusinessData = await BussinesByID(business.Business_Id)

        if (BusinessData != null) {
            setBusiness(BusinessData)
            _storeData("business", BusinessData)
            navigation.navigate("BusinessProfileScreen")
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
        let res = await fetch(`${url}/bussines/upload`, {
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
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isBusiness={true} navigation={navigation} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={profile.container}>
                    <Text style={[form.heading, form.field]}>Business Edit Profile</Text>
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
                                source={{ uri: image || business.Image }}
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
                            label="Business Name"
                            onChangeText={value => setBusinessName(value)}
                            name="Businessname"
                        />
                        <Input
                            label="Owner Name"
                            onChangeText={value => setOwnerName(value)}
                            name="Ownername"
                        />
                        <Input
                            label="Email"
                            onChangeText={value => setEmail(value)}
                            name="email"
                        />
                        <MainButton
                            onPress={Checkdetails}
                            content={"Update"}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>

    );
};

export default BusinessEditProfile;