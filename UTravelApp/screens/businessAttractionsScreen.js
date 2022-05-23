//import react & useState
import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
//ui elements
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native"
//icons
import { Ionicons } from '@expo/vector-icons';
// styles
import { general, headercity } from "../utility/style/styles"
import { colors } from "../utility/style/colors"
//components
import CustomHeader from '../components/customHeader'
import AttractionBox from '../components/attractionBox'
//storge
import { _retrieveData, url } from "../utility/storge"

const ListAttractions = ({ navigation }) => {

    const [business, setBusiness] = useState({});
    const [attraction, setAttraction] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            const fetchBusiness = async () => {
                try {
                    const b = JSON.parse(await _retrieveData("business"))
                    if (isActive) {
                        setBusiness(b)
                        fetchAttraction(b)
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
    
    const fetchAttraction = async (b) => {
        let res = await fetch(`${url}/bussines/attraction/${b.Business_Id}`)
        let data = await res.json()
        setAttraction(data)
        setIsLoading(false)
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isBusiness={true} navigation={navigation} onChangeText />
            <ScrollView style={general.container}>
                <View>
                    <Image source={{ uri: business.Image }} style={{ width: '100%', height: 250, borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }} />
                    <View style={headercity.box}>
                        <Text style={headercity.title}>{business.Business_Name}</Text>
                        <Text style={headercity.country}>
                            <Ionicons name='person-circle' size={15} color={colors.white} /> {business.Owner_Name}</Text>
                    </View>
                </View>
                <View style={{ marginVertical: 20 }}>
                    <Text style={general.title}>List of Attractions</Text>
                    {isLoading && <Text style={general.title}>Loading...</Text>}
                    {!isLoading && <View>
                        {attraction.map((item, index) =>
                            <AttractionBox
                                key={index}
                                itemData={item}
                                onPress={() => navigation.navigate("BusinessAttractionScreen", { itemData: item })}
                            />
                        )}
                    </View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ListAttractions;