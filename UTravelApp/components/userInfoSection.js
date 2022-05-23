import React from 'react';
//styles
import { profile } from '../utility/style/styles';
import { colors } from '../utility/style/colors';
//ui elements
import {View, Text, Image} from 'react-native';
//icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const UserInfoSection = (props) => {
 return (
    <View style={profile.userInfoSection}>
        <Image 
            source={require('../assets/logo/logo2.png')} style={{ width:120, height: 120 , borderRadius:60,marginTop: 25}}
        />
        <View style={{margin: 30}}>
            <Text style={profile.name}>{props.name}</Text>
                <View style={profile.row}>
                    <MaterialCommunityIcons name='email' size={20} color={colors.darkLight} />
                    <Text style={{color:colors.darkLight, marginLeft:10}}>{props.email}</Text>
                </View>
        </View>
    </View>
);
}
export default UserInfoSection;
