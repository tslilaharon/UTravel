import React from "react";
//ui elements
import { View, Image, TouchableOpacity } from 'react-native';
//icons
import { Feather ,Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ isValidation, isMain, isBusiness, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', height: 60, marginTop: 60, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          isMain ?
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={30} color="black" />
            </TouchableOpacity>
            :
            isValidation ?
              <TouchableOpacity>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="black" />
              </TouchableOpacity>
        }
      </View>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate(isValidation ? "LogInScreen" : "HomeScreen")}>
          <Image style={{ width: 100, height: 50 }}
            source={require('../assets/logo/logo.png')}
            resizeMode='contain' />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
        isBusiness ?
        <TouchableOpacity>
        </TouchableOpacity>
        :
        isMain ?
        <TouchableOpacity  onPress={() => navigation.navigate("ShoppingCartScreen")}>
          <Feather name="shopping-bag" size={25} color="black" />
        </TouchableOpacity>
        :
        <TouchableOpacity>
        </TouchableOpacity>
        }
      </View>
    </View>
  );
}
export default CustomHeader;