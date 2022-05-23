//import react & useState
import React, { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
//ui elements
import {
  SafeAreaView, View, ScrollView, Image,
  Text, TouchableOpacity
}
  from "react-native";
//icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//styles
import { profile } from "../utility/style/styles"
import { colors } from "../utility/style/colors"
//components
import CustomHeader from '../components/customHeader'
//storge
import { _retrieveData } from "../utility/storge"

const Profile = ({ navigation }) => {
  const [user, setUser] = useState({});
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader isMain={true} navigation={navigation} />
      <ScrollView style={profile.container}>
        <View style={profile.userInfoSection}>
          <Image
            source={{ uri: user.Image || 'https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png' }}
            style={{ width: 120, height: 120, borderRadius: 60, margin: 25 }}
          />
          <View style={{ marginVertical: 30 }}>
            <Text style={profile.name}>{user.User_Name}</Text>
            <View style={profile.row}>
              <MaterialCommunityIcons name="email" size={20} color={colors.darkLight} />
              <Text style={{ color: colors.darkLight, marginLeft: 10 }}>{user.Email}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10, borderTopColor: colors.secondary, borderTopWidth: 1, }}>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfileScreen")}>
            <View style={profile.iconMenu}>
              <MaterialCommunityIcons name="account-edit" size={28} color={colors.primary} />
              <Text style={profile.textMenu}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("OrdersListScreen")}>
            <View style={profile.iconMenu}>
              <Ionicons name="receipt" size={24} color={colors.primary} />
              <Text style={profile.textMenu}>My Orders</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ListReviewsScreen")}>
            <View style={profile.iconMenu}>
              <MaterialCommunityIcons name="comment-edit" size={24} color={colors.primary} />
              <Text style={profile.textMenu}>Write a Review</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
            <View style={profile.iconMenu}>
              <Ionicons name="settings-sharp" size={25} color={colors.primary} />
              <Text style={profile.textMenu}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default Profile;