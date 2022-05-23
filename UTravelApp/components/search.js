import React, { useState, useEffect } from 'react';
//styles
import { search } from '../utility/style/styles';
import { colors } from '../utility/style/colors';
//ui elements
import { View, TextInput, Text } from 'react-native';
//icons
import { AntDesign } from '@expo/vector-icons';
import { _retrieveData, url } from '../utility/storge';
import { ScrollView } from 'react-native-gesture-handler';

const SearchBox = ({ navigation }) => {
  const [cities, setCities] = useState([{}]);
  const [filteredData, setFilteredData] = useState([]);
  const [inputEvent, setEvent] = useState("");

  const fetchCities = async () => {
    let res = await fetch(`${url}/cities`)
    let data = await res.json()
    setCities(data)
  };

  const handleFilter = (inputEvent) => {
    const searchWord = inputEvent;
    const newFilter = cities.filter((value) => {
      return value.City_Name.toLowerCase().includes(searchWord.toLowerCase());
    })
    if (searchWord === "") {
      setFilteredData([]);
    }
    else {
      setFilteredData(newFilter)
    }
  };

  useEffect(() => {
    fetchCities()
    return () => { }
  }, []);


  return (
    <View style={search.container}>
      <View style={search.box}>
        <AntDesign name="search1" style={search.searchIcon} />
        <TextInput style={search.input} placeholder={"Search City.."} onChangeText={value => setEvent(value), handleFilter} />
        {
          filteredData.length != 0 && (
            < ScrollView style={search.result} >
              {filteredData.slice(0, 10).map((value, key) => {
                return (
                  <Text style={search.resultItem}
                    key={key}
                    itemData={value}
                    onPress={() => navigation.navigate('CityScreen', {
                      itemData: value
                    })}
                  >
                    {value.City_Name}
                  </Text>)})}
            </ScrollView>
          )}
      </View>
    </View >
  );
}
export default SearchBox;
