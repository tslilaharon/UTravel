import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
//styles
import { basic, home, } from "../utility/style/styles";
//ui elements
import {
    SafeAreaView, ImageBackground, ScrollView,
    TouchableOpacity, Text, View, FlatList
} from 'react-native';
//components
import PopularDestinations from '../components/popularDestinations'
import BestSellers from '../components/bestSellers'
import AttractionBox from '../components/attractionBox'
import SearchBox from '../components/search'
import CustomHeader from '../components/customHeader'
//storge
import { _retrieveData, url } from "../utility/storge"

const Home = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [TopThreeData, setTopThreeData] = useState([{}]);
    const [PopularData, setPopularData] = useState([{}]);
    const [SellersData, setSellersData] = useState([{}]);
    const [DealsData, setDealsData] = useState([{}]);

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

    useEffect(() => {
        let load = true
        TopThree()
        Popular()
        Sellers()
        Deals()
        return () => { load = false }
    }, []);

    const TopThree = async () => {
        try {
            let res = await fetch(`${url}/home/topthree`)
            if (res.status == 200) {
                let data = await res.json()
                setTopThreeData(data)
                return data
            }
            else {
                return null
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const Popular = async () => {
        try {
            let res = await fetch(`${url}/home/popular`)
            if (res.status == 200) {
                let data = await res.json()
                setPopularData(data)
                return data
            }
            else {
                return null
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const Sellers = async () => {
        try {
            let res = await fetch(`${url}/home/sellers`)
            if (res.status == 200) {
                let data = await res.json()
                setSellersData(data)
                return data
            }
            else {
                return null
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const Deals = async () => {
        try {
            let res = await fetch(`${url}/home/deals`)
            if (res.status == 200) {
                let data = await res.json()
                setDealsData(data)
                return data
            }
            else {
                return null
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isMain={true} navigation={navigation} />
            <ScrollView style={home.container}>
                <View>
                    <ImageBackground
                        source={{ uri: TopThreeData[0].Image }}
                        style={{ width: '100%', height: 500, }}
                        imageStyle={{ borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}>
                        <View style={home.DarkOver}></View>
                        <View>
                            <SearchBox navigation={navigation} />
                        </View>
                        <View style={home.searchContainer}>
                            <Text style={home.cityName}>{TopThreeData[0].City_Name}</Text>
                            <Text style={home.userName}>Hi {user.User_Name},</Text>
                            <Text style={home.userText}>You're ready to</Text>
                            <Text style={home.userText}>Find your next trip</Text>
                        </View>
                        <TouchableOpacity style={home.btnView} onPress={() => navigation.navigate("CityScreen", { itemData: TopThreeData[0] })}>
                            <Text style={basic.btnText}>View</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <Text style={home.titleText}>Popular Destinations</Text>
                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={PopularData}
                        renderItem={({ item}) => {
                            return (
                                <PopularDestinations
                                    itemData={item}
                                    onPress={() => navigation.navigate("CityScreen", { itemData: item })}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <Text style={home.titleText}>Best Sellers</Text>
                <View>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={SellersData}
                        renderItem={({ item }) => {
                            return (
                                <BestSellers
                                    itemData={item}
                                    onPress={() => navigation.navigate("AttractionScreen", { itemData: item })}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()} />
                </View>
                <Text style={home.titleText}>Best Deals</Text>
                <View>
                    {DealsData.map((item, index) =>
                        <AttractionBox
                            itemData={item}
                            key={index}
                            onPress={() => navigation.navigate("AttractionScreen", { itemData: item })} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default Home;

