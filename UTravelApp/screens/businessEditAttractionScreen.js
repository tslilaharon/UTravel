//import react & useState
import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
//ui elements
import {
    Text, ScrollView, SafeAreaView, ImageBackground,
    TouchableWithoutFeedback, Keyboard, View, TouchableOpacity
}
    from "react-native";
//styles
import { basic, form } from "../utility/style/styles"
import { colors } from "../utility/style/colors"
//components
import CustomHeader from '../components/customHeader'
import Input from '../components/input'
import MainButton from '../components/mainButton'
//validation
import {
    isEmptyData, checkLength10, checkLength20, checkLength30, checkLength40,
    checkLength100, FormatTime, FormatPrice, AttractiondefaultImage
} from "../utility/validation";
//storge
import { _storeData, _retrieveData, url } from "../utility/storge"
//image picker
import * as ImagePicker from 'expo-image-picker'

const BusinessEditAttraction = ({ navigation, route }) => {

    const itemData = route.params.itemData;

    const [attractionName, setAttractionName] = useState(itemData.Attraction_Name);
    const [cityName, setCityName] = useState(itemData.City_Name);
    const [address, setAddress] = useState(itemData.Address);
    const [openingHour, setOpeningHour] = useState(itemData.Open_Hour);
    const [closingHour, setClosingHour] = useState(itemData.Close_Hour);
    const [stockQuantity, setStockQuantity] = useState(itemData.Stock_Quantity);
    const [inStock, setInStock] = useState(true);
    const [price, setPrice] = useState(itemData.Price);
    const [category, setCategory] = useState(itemData.Category);
    const [title, setTitle] = useState(itemData.Title);
    const [information, setInformation] = useState(itemData.Information);
    const [image, setImage] = useState(itemData.Image);

    const [attraction, setAttraction] = useState(itemData);

    const EditAttraction = async () => {
        await fetch(`${url}/attractions/edit/${attraction.Attraction_Id}`, {
            method: "PUT",
            body: JSON.stringify({
                Attraction_Name: attractionName, City_Name: cityName, Address: address,
                Open_Hour: openingHour, Close_Hour: closingHour, Rating: itemData.Rating,
                Rating_Star: itemData.Rating_Star, Stock_Quantity: stockQuantity, In_Stock: inStock,
                Price: price, Category: category, Title: title, Information: information, Image: image
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
    };

    const AttractionById = async () => {
        let res = await fetch(`${url}/attractions/${itemData.Attraction_Id}`)
        let data = await res.json()
        return data
    };

    const Checkdetails = async () => {

        if (isEmptyData(attractionName) || isEmptyData(cityName) ||
            isEmptyData(address) || isEmptyData(openingHour) || isEmptyData(closingHour) ||
            isEmptyData(stockQuantity) || isEmptyData(price) || isEmptyData(category) || isEmptyData(title) ||
            isEmptyData(information)) {
            alert("One of the Inputs is empty")
            return
        }
        else if (!checkLength20(attractionName)) {
            alert("Attraction Name Need Contain Less Than 20 Characters")
            return
        }
        else if (!checkLength30(address)) {
            alert("Address Need Contain Less Than 30 Characters")
            return
        }
        else if (!checkLength10(category)) {
            alert("Category Need Contain Less Than 10 Characters")
            return
        }
        else if (!checkLength40(title)) {
            alert("Title Need Contain Less Than 40 Characters")
            return
        }
        else if (!checkLength100(information)) {
            alert("Information Need Be Less Than 100 Characters")
            return
        }
        else if (!FormatPrice(price)) {
            alert("Price Format Is Not Correct (Example: 10.99 or 1,000.00)")
            return
        }
        else if (!FormatTime(openingHour) || !FormatTime(closingHour)) {
            alert("Time Format Is Not Correct (Example: 20:00)")
            return
        }
        else if (stockQuantity == 0) {
            setInStock(false);
            alert("Your Stock Is Empty")
            return
        }
        setImage(AttractiondefaultImage(attraction.Image))

        await EditAttraction(attraction.Attraction_Id, attractionName, cityName, address, openingHour, closingHour,
        itemData.Rating, itemData.Rating_Star, stockQuantity, inStock, price, category, title, information, image)

        const AttractionData = await AttractionById(attraction.Attraction_Id)
        if (AttractionData != null) {
            setAttraction(AttractionData)
            navigation.navigate("BusinessAttractionScreen", { itemData: AttractionData });
        }
    };

    const _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isBusiness={true} navigation={navigation} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={basic.container}>
                    <Text style={[form.heading, form.field]}>Edit Attraction</Text>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={_pickImage}>
                            <ImageBackground
                                source={{ uri: image || itemData.Image }}
                                style={{
                                    height: 150, width: 150, margin: 5, borderRadius: 90,
                                    borderWidth: 2, borderColor: colors.primary
                                }}
                                imageStyle={{ borderRadius: 90, margin: -2, }}>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <Input
                        label="Attraction Name"
                        onChangeText={value => setAttractionName(value)}
                        name="attractionName"
                    />
                    <Input
                        label="City Name"
                        onChangeText={value => setCityName(value)}
                        name="CityName"
                    />
                    <Input
                        label="Address"
                        onChangeText={value => setAddress(value)}
                        name="Address"
                    />
                    <Input
                        label="Opening Hour"
                        onChangeText={value => setOpeningHour(value)}
                        name="OpeningHour"
                    />
                    <Input
                        label="Closing Hour"
                        onChangeText={value => setClosingHour(value)}
                        name="Closing Hour"
                    />
                    <Input
                        label="Stock Quantity"
                        onChangeText={value => setStockQuantity(value)}
                        name="StockQuantity"
                    />
                    <Input
                        label="Price"
                        onChangeText={value => setPrice(value)}
                        name="Price"
                    />
                    <Input
                        label="Category"
                        onChangeText={value => setCategory(value)}
                        name="Category"
                    />
                    <Input
                        label="Title"
                        onChangeText={value => setTitle(value)}
                        name="Title"
                    />
                    <Input
                        label="Information"
                        onChangeText={value => setInformation(value)}
                        name="Information"
                    />
                    <MainButton
                        onPress={Checkdetails}
                        content={"Update"}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};
export default BusinessEditAttraction;