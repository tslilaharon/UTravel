import React, { useState, useEffect } from 'react';
// ui elements
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
// styles
import { general } from '../utility/style/styles'
//components
import AttractionBox from '../components/attractionBox'
import CityInformation from '../components/cityInfo'
import HeaderCity from '../components/headerCity'
import CustomHeader from '../components/customHeader'
//storge
import { _retrieveData, url } from '../utility/storge'

const City = ({ navigation, route }) => {

  const itemData = route.params.itemData;
  const [attraction, setAttraction] = useState([{}]);

  const fetchAttraction = async () => {
    try {
      let res = await fetch(`${url}/cities/attractions/${itemData.City_Id}`)
      let data = await res.json()
      setAttraction(data)
    }
    catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    let load = true
    fetchAttraction()
    return () => { load = false }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader isMain={false} navigation={navigation} />
      <ScrollView style={general.container}>
        <HeaderCity itemData={itemData} />
        <CityInformation itemData={itemData} />
        <Text style={general.title}>Attractions</Text>
        <View>
          {
            attraction.length === 0 ?
              <Text style={general.title}>No attractions found in the system</Text>
              :
              attraction.map((item, index) =>
                <AttractionBox
                  itemData={item}
                  key={index}
                  onPress={() => navigation.navigate('AttractionScreen', { itemData: item })}
                />
              )
          }
        </View>
        <TouchableOpacity>
          <Text style={general.ViewMore}>View more</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>

  );
};

export default City;
