//import react & useState
import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
//ui elements
import {
  View, ScrollView, Image,
  Text,
  TouchableOpacity, SafeAreaView
}
  from "react-native";
//icons
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
//styles
import { profile, businessprofile } from "../utility/style/styles"
import { colors } from "../utility/style/colors"
//components
import CustomHeader from '../components/customHeader'
//storge
import { _retrieveData, url } from "../utility/storge"

const BusinessProfile = ({ navigation }) => {
  const [business, setBusiness] = useState({});
  const [TicketsSoldPercentage, setTicketsSoldPercentage] = useState(0);
  const [SumTicketsSold, setSumTicketsSold] = useState(0);
  const [stockSum, setStockSum] = useState(0);
  const [countStock, setCountStock] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true
      const fetchBusiness = async () => {
        try {
          const b = JSON.parse(await _retrieveData("business"))
          if (isActive) {
            setBusiness(b)
            fetchTicketsSold(b)
            fetchinStock(b)
            fetchStockQty(b)
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

  useEffect(() => {
    let load = true
    ClacTicketsSoldPercentage()
    return () => { load = false }
  }, [stockSum]);


  const fetchTicketsSold = async (b) => {
    try {
      let res = await fetch(`${url}/bussines/ticketssold/${b.Business_Id}`)
      let data = await res.json()
      ClacTicketsSold(data)
    }
    catch (error) {
      console.log(error);
    }
  };

  const ClacTicketsSold = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].Quantity
    }
    setSumTicketsSold(sum)
  };

  const ClacTicketsSoldPercentage = () => {
    let percentage = 0;
    if (stockSum != 0) {
      percentage = SumTicketsSold / stockSum * 100;
      setTicketsSoldPercentage(percentage.toFixed(2))
    }
    else {
      setTicketsSoldPercentage(0)
    }
  };

  const fetchStockQty = async (b) => {
    try {
      let res = await fetch(`${url}/bussines/stockqty/${b.Business_Id}`)
      let data = await res.json()
      SumStockQty(data)
    }
    catch (error) {
      console.log(error);
    }
  };

  const SumStockQty = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].Stock_Quantity
    }
    setStockSum(sum)
  };

  const fetchinStock = async (b) => {
    try {
      let res = await fetch(`${url}/bussines/instock/${b.Business_Id}`)
      let data = await res.json()
      countInStock(data)
    }
    catch (error) {
      console.log(error);
    }
  };

  const countInStock = (data) => {
    let countStock = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].In_Stock == true) {
        countStock++;
      }
      else {
        countStock--;
      }
    }
    setCountStock(countStock)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader isBusiness={true} isMain={true} navigation={navigation} />
      <ScrollView style={profile.container}>
        <View style={profile.userInfoSection}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: business.Image }} style={{ width: 120, height: 120, borderRadius: 60 }}
            />
            <View style={{ marginLeft: 30 }}>
              <Text style={profile.name}>{business.Business_Name}</Text>
              <View style={profile.row}>
                <Ionicons name="person-circle" size={20} color={colors.darkLight} />
                <Text style={{ color: colors.darkLight, marginLeft: 10 }}>{business.Owner_Name}</Text>
              </View>
              <View style={profile.row}>
                <MaterialCommunityIcons name="email" size={20} color={colors.darkLight} />
                <Text style={{ color: colors.darkLight, marginLeft: 10 }}>{business.Email}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 30 }}>
          <View style={businessprofile.infoBoxWrapper}>
            <View style={[businessprofile.infoBox, {
              borderRightColor: colors.secondary,
              borderRightWidth: 1
            }]}>
              <TouchableOpacity onPress={() => navigation.navigate("AddAttractionScreen")} >
                <View style={businessprofile.menu}>
                  <MaterialCommunityIcons name="sticker-plus" size={24} color={colors.primary} />
                  <Text style={businessprofile.menuText}>Add Attraction</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={businessprofile.infoBox}>
              <TouchableOpacity onPress={() => navigation.navigate('AttractionsScreen', { itemData: business })}>
                <View style={businessprofile.menu}>
                  <MaterialCommunityIcons name="format-list-text" size={24} color={colors.primary} />
                  <Text style={businessprofile.menuText}>My Attractions</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={businessprofile.infoBoxWrapper}>
            <View style={[businessprofile.infoBox, {
              borderRightColor: colors.secondary,
              borderRightWidth: 1
            }]}>
              <TouchableOpacity onPress={() => navigation.navigate("BusinessEditProfileScreen")} >
                <View style={businessprofile.menu}>
                  <MaterialCommunityIcons name="account-edit" size={24} color={colors.primary} />
                  <Text style={businessprofile.menuText}>Edit Profile</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={businessprofile.infoBox}>
              <TouchableOpacity onPress={() => navigation.navigate("BusinessSettingsScreen", { itemData: business })}>
                <View style={businessprofile.menu}>
                  <Ionicons name="settings-sharp" size={25} color={colors.primary} />
                  <Text style={businessprofile.menuText}>Settings</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <Text style={businessprofile.textTitle}>My Business Data</Text>
        <View style={{ marginVertical: 20 }}>
          <View style={businessprofile.dataBox}>
            <Text style={businessprofile.dataTitle}>Orders</Text>

            <View style={[{ marginHorizontal: 20 }, businessprofile.fieldRow]}>
              <Text style={[{ marginLeft: 5 }, businessprofile.textNum]}>{SumTicketsSold}</Text>
              <Text style={businessprofile.textNum}>{TicketsSoldPercentage}%</Text>
            </View>


            <View style={[{ marginHorizontal: 10 }, businessprofile.fieldRow]}>
              <Text style={businessprofile.details}>Tickets Sold</Text>
              <Text style={businessprofile.details}>Sales Percentages</Text>
            </View>
          </View>

          <View style={businessprofile.dataBox}>
            <Text style={businessprofile.dataTitle}>Stock</Text>
            <View style={[{ marginHorizontal: 40 }, businessprofile.fieldRow]}>
              <Text style={businessprofile.textNum}>{stockSum}</Text>
              <Text style={businessprofile.textNum}>{countStock}</Text>
            </View>

            <View style={businessprofile.fieldRow}>
              <Text style={businessprofile.details}>Quantity of Tickets</Text>
              <Text style={businessprofile.details}>Attractions In Stock</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessProfile;