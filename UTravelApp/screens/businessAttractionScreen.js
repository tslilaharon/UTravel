//import react & useState
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
//ui elements
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
//icons
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
// styles
import { general, attraction, businessattraction } from '../utility/style/styles';
import { colors } from '../utility/style/colors';
//components
import CustomHeader from '../components/customHeader';
import Header from '../components/headerBox';
import OpeningHours from '../components/openingHours';
import ReviewBox from '../components/reviewBox';
//storge
import { url, _retrieveData } from '../utility/storge';

const BusinessAttraction = ({ navigation, route }) => {

  const itemData = route.params.itemData;
  const [business, setBusiness] = useState({});
  const [review, setReview] = useState([{}]);
  const [found, setFound] = useState(false);

  const fetchReviews = async () => {
    try {
      let res = await fetch(`${url}/attractions/reviews/${itemData.Attraction_Id}`)
      let data = await res.json()
      if (data[0] != undefined) {
        setReview(data)
        setFound(true)
      }
      else {
        setReview(data)
        setFound(false)
      }
    }
    catch (e) {
      console.log(e)
    }
  };

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

  const deleteAttraction = async () => {
    try {
      let res = await fetch(`${url}/attractions/delete/${itemData.Attraction_Id}`, {
        method: 'DELETE',
        body: JSON.stringify({ Attraction_Id: itemData.Attraction_Id }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      let data = await res.json()
      if (data != null) {
        alert('Attraction deleted!')
        navigation.navigate('AttractionsScreen', { itemData: business })
      }
    }
    catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    let load = true
    fetchReviews()
    return () => { load = false }
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader isBusiness={true} navigation={navigation} />
      <ScrollView style={general.container}>
        <Header itemData={itemData} />
        <View style={businessattraction.desBox}>
          <View style={businessattraction.editdelete}>
            <AntDesign onPress={() => navigation.navigate('BusinessEditAttractionScreen', { itemData: itemData })} name='edit' size={24} color={colors.primary} style={{ marginRight: 10 }} />
            <MaterialCommunityIcons onPress={deleteAttraction} name='delete-empty-outline' size={26} color={colors.primary} />
          </View>
          <Text style={attraction.title}>{itemData.Title}</Text>
          <Text style={attraction.description}>{itemData.Information}</Text>

        </View>

        <View style={businessattraction.box}>
          <View style={businessattraction.menu}>
            <MaterialCommunityIcons name={itemData.In_Stock ? 'checkbox-marked-outline' : 'close-box-multiple-outline'}
              size={24} color={colors.primary} />
            <Text style={businessattraction.textBold}>Availability:</Text>
            <Text style={businessattraction.menuText}> {itemData.In_Stock ? 'In Stock' : 'Out of stock'}</Text>
          </View>
          <View style={businessattraction.menu}>
            <MaterialCommunityIcons name='alert-box-outline' size={25} color={colors.primary} />
            <Text style={businessattraction.textBold}>Inventory:</Text>
            <Text style={businessattraction.menuText}> {itemData.Stock_Quantity}</Text>
          </View>
          <View style={businessattraction.menu}>
            <MaterialCommunityIcons name='tag-multiple-outline' size={25} color={colors.primary} />
            <Text style={businessattraction.textBold}>price:</Text>
            <Text style={businessattraction.menuText}> $ {itemData.Price}</Text>
          </View>
        </View>
        <View style={businessattraction.StockBox}>
          <OpeningHours itemData={itemData} />
        </View>
        <View style={{ margin: 10 }}>
          <Text style={general.title}>Reviews</Text>
          {
            found ?
              review.map((item, index) =>
                <View style={{ margin: 10 }}>
                  <ReviewBox
                    itemData={item}
                    key={item.Review_Id} />
                </View>)
              :
              <View style={general.nofound}>
                <Text style={general.content}>No reviews found..</Text>
              </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessAttraction;