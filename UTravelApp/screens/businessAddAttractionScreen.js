//import react & useState
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
//ui elements
import {
  Text, ScrollView, View, TouchableOpacity, ImageBackground,
  TouchableWithoutFeedback, Keyboard, SafeAreaView
}
  from 'react-native';
//styles
import { basic, form, allcities } from '../utility/style/styles';
import { colors } from '../utility/style/colors';
//components
import CustomHeader from '../components/customHeader';
import Input from '../components/input';
import MainButton from '../components/mainButton';
//validation
import {
  isEmptyData, checkLength20, checkLength30, checkLength40,
  checkLength10, checkLength100, FormatTime, FormatPrice, AttractiondefaultImage
} from '../utility/validation';
//storge
import { _storeData, _retrieveData, url } from '../utility/storge';
import * as ImagePicker from 'expo-image-picker';


const AddAttraction = ({ navigation }) => {

  const [attractionName, setAttractionName] = useState('');
  const [cityName, setCityName] = useState('');
  const [address, setAddress] = useState('');
  const [openingHour, setOpeningHour] = useState('');
  const [closingHour, setClosingHour] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [inStock, setInStock] = useState(true);
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState(0);
  const [rating_star, setRatingStar] = useState(1);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState('');
  const [image, setImage] = useState(null);

  const [business, setBusiness] = useState({});
  const [city, setCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true
      const fetchBusiness = async () => {
        try {
          const b = JSON.parse(await _retrieveData('business'))
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

  const fectchCity = async () => {
    try {
      let res = await fetch(`${url}/cities/cityname`, {
        method: 'POST',
        body: JSON.stringify({ City_Name: cityName }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      let data = await res.json()
      return data[0];
    }
    catch (error) {
      console.log(error);
    }
  }

  const AddAttraction = async () => {
    try {
      let res = await fetch(`${url}/attractions/add`, {
        method: 'POST',
        body: JSON.stringify({
          Attraction_Name: attractionName, City_Name: cityName, Address: address,
          Open_Hour: openingHour, Close_Hour: closingHour, Rating: rating,
          Rating_Star: rating_star, Stock_Quantity: stockQuantity, In_Stock: inStock,
          Price: price, Category: category, Title: title, Information: information, Image: image,
          Business_Id: business.Business_Id, City_Id: city.City_Id
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
  }

  const Checkdetails = async () => {
    if (isEmptyData(attractionName) || isEmptyData(cityName) ||
      isEmptyData(address) || isEmptyData(openingHour) || isEmptyData(closingHour) ||
      isEmptyData(stockQuantity) || isEmptyData(price) || isEmptyData(category) || isEmptyData(title) ||
      isEmptyData(information)) {
      alert('One of the Inputs is empty')
      return
    }
    else if (!checkLength20(attractionName)) {
      console.log(checkLength20(attractionName))
      alert('Attraction Name Need Contain Less Than 20 Characters')
      return
    }
    else if (!checkLength30(address)) {
      console.log(checkLength30(address))
      alert('Address Need Contain Less Than 30 Characters')
      return
    }
    else if (!checkLength10(category)) {
      console.log(checkLength10(category))
      alert('Category Need Contain Less Than 10 Characters')
      return
    }
    else if (!checkLength40(title)) {
      console.log(checkLength40(title))
      alert('Title Need Contain Less Than 40 Characters')
      return
    }
    else if (!checkLength100(information)) {
      console.log(checkLength100(information))
      alert('Information Need Be Less Than 100 Characters')
      return
    }
    else if (!FormatPrice(price)) {
      console.log(checkLength100(price))
      alert('Price Format Is Not Correct (Example: 10.99 or 1,000.00)')
      return
    }
    else if ((!FormatTime(openingHour)) || (!FormatTime(closingHour))) {
      alert('Time Format Is Not Correct (Example: 20:00)')
      return
    }
    else if (isNaN(stockQuantity)) {
      alert('Time Format Is Not Correct (Example: 20:00)')
      return
    }
    else if (stockQuantity == 0) {
      setInStock(false);
      alert('Your Stock Is Empty')
      return
    }
    let img = AttractiondefaultImage(image)
    setImage(img)

    const dataCity = await fectchCity(cityName)
    setCity(dataCity)

    let AttractionData = await AddAttraction(attractionName, cityName, address, openingHour, closingHour, rating, rating_star,
      stockQuantity, inStock, price, category, title, information, image, business.Business_Id, dataCity.City_Id)

    if (AttractionData != null) {
      alert('The attraction added')
      navigation.navigate('AttractionsScreen', { itemData: business })
    }
    else {
      alert('The attraction was not added')
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
  };

  const UploadImage = async (file) => {
    let res = await fetch(`${url}/attractions/upload`, {
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
        <ScrollView style={basic.container}>
          <Text style={[form.heading, form.field]}>Add Attraction</Text>
          <View
            style={{
              flex: 1,
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <TouchableOpacity onPress={_pickImage}>
              {isLoading && <View style={allcities.containerBox}>
                <Text style={allcities.label}>Loading...</Text>
              </View>}
              {!isLoading && <ImageBackground
                source={{ uri: image }}
                style={{
                  height: 150, width: 150, margin: 5, borderRadius: 90,
                  borderWidth: 2, borderColor: colors.primary
                }}
                imageStyle={{ borderRadius: 90, margin: -2, }}>
              </ImageBackground>}
            </TouchableOpacity>
          </View>

          <Input
            label='Attraction Name'
            onChangeText={value => setAttractionName(value)}
            name='AttractionName'
          />

          <Input
            label='City Name'
            onChangeText={value => setCityName(value)}
            name='cityName'
          />

          <Input
            label='Address'
            onChangeText={value => setAddress(value)}
            name='Address'
          />
          <Input
            label='Opening Hour'
            onChangeText={value => setOpeningHour(value)}
            name='openHour'
          />

          <Input
            label='Closing Hour'
            onChangeText={value => setClosingHour(value)}
            name='closingHour'
          />

          <Input
            label='Stock Quantity'
            onChangeText={value => setStockQuantity(value)}
            name='StockQuantity'
          />

          <Input
            label='Price'
            onChangeText={value => setPrice(value)}
            name='Price'
          />

          <Input
            label='Category'
            onChangeText={value => setCategory(value)}
            name='category'
          />

          <Input
            label='Title'
            onChangeText={value => setTitle(value)}
            name='title'
          />

          <Input
            label='Information'
            onChangeText={value => setInformation(value)}
            name='Information'
          />

          <MainButton
            onPress={Checkdetails}
            content={'Add'}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>

  );
};

export default AddAttraction;