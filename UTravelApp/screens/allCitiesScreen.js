import React, { useState, useEffect } from 'react';
//styles
import { allcities, } from '../utility/style/styles';
//ui elements
import {
    SafeAreaView, Text, View, FlatList
} from 'react-native';
//components
import CitiesBox from '../components/citiesBox';
import CustomHeader from '../components/customHeader';
//storge
import { _retrieveData, url } from '../utility/storge';

const AllCities = ({ navigation }) => {

    const [cities, setCities] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCities = async () => {
        let res = await fetch(`${url}/cities`)
        let data = await res.json()
        setCities(data)
        setIsLoading(false)
    };

    useEffect(() => {
        let load = true
        fetchCities()
        return () => {load = false}
    }, []);

    return (
        <SafeAreaView style={allcities.container}>
            <CustomHeader isMain={true} navigation={navigation} />
                <View style={allcities.labelBox}>
                    <Text style={allcities.label}>All Cities</Text>
                </View>
                {isLoading && <View style={allcities.containerBox}>
                    <Text style={allcities.label}>Loading...</Text>
                </View>}
                <View style={allcities.containerBox} >
                    {!isLoading && <FlatList
                        showsVerticalScrollIndicator={false}
                        data={cities}
                        numColumns={2}
                        renderItem={({ item }) => {
                            return (
                                <CitiesBox
                                    itemData={item}
                                    onPress={() => navigation.navigate('CityScreen', { itemData: item })} />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />}
                </View>
        </SafeAreaView>
    );
}
export default AllCities;
