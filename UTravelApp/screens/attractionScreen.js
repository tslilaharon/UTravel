// import react & useState
import React, { useState, useEffect } from 'react';
// ui elements
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// styles
import { general, attraction } from '../utility/style/styles';
// components
import RatingStars from '../components/ratingStars';
import ReviewBox from '../components/reviewBox';
import Header from '../components/headerBox';
import OpeningHours from '../components/openingHours';
import MainButton from '../components/mainButton';
//storge
import { _retrieveData, url, _storeData, _storeItemData } from '../utility/storge';

const Attraction = ({ navigation, route }) => {

  const itemData = route.params.itemData;

  const [qty, setQty] = useState(1);
  const [review, setReview] = useState([{}]);
  const [found, setFound] = useState(false);

  const fetchReviews = async () => {
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
  };
  const storeItemInCart = async () => {
    _storeItemData('Cart', itemData, qty)
    navigation.navigate('ShoppingCartScreen')
  };

  useEffect(() => {
    let load = true
    fetchReviews()
    return () => { load = false }
  }, []);

  return (
    <ScrollView style={general.container}>
      <Header itemData={itemData} />
      <View style={attraction.box}>
        <Text style={attraction.title}>{itemData.Title}</Text>
        <Text style={attraction.description}>{itemData.Information}</Text>
      </View>

      <View style={attraction.StockBox}>
        <OpeningHours itemData={itemData} />
        <Text style={attraction.price}>${itemData.Price}</Text>
      </View>

      <Text style={general.title}>Ratings</Text>
      <View style={attraction.ratingBox}>
        <Text style={attraction.ratingTitle}>{itemData.Rating}</Text>
        <RatingStars ratings={itemData.Rating_Star} />
      </View>

      <Text style={general.title}>Reviews</Text>
      <View>
        {
          found ?
            review.map((item, index) =>
              <View key={index} style={{ margin: 10 }}>
                <ReviewBox
                  itemData={item}
                  key={index} />
              </View>)
            :
            <View style={general.nofound}>
              <Text style={general.content}>No reviews found..</Text>
            </View>
        }
      </View>

      <MainButton
        onPress={storeItemInCart}
        content={'Book Now'}
      />
    </ScrollView>
  );
};

export default Attraction;
