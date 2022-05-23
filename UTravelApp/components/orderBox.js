import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
//styles 
import { listorders } from '../utility/style/styles';
//ui elements
import { TouchableOpacity, Text, View } from 'react-native';
//icons
import { Ionicons } from '@expo/vector-icons';
import { _retrieveData, url } from "../utility/storge"

const OrderBox = ({ itemData, onPress }) => {
    const [user, setUser] = useState({});
    const [dateTime, setDateTime] = useState();

    const OrderDateTime = () => {
        if (itemData.Order_Date !== undefined) {
            let s = itemData.Order_Date
            let res = s.substring(0, 19).replace('T', ' ')
            setDateTime(res)
        }
        return
    }

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
        OrderDateTime()
    }, [itemData]);


    return (
        <TouchableOpacity onPress={onPress}>
            <View style={listorders.orderBox}>
                <View style={listorders.boxDetails}>
                    <View style={listorders.orderDetails}>
                        <View style={listorders.iconInfo}>
                            <Ionicons name='information-circle-outline' size={22} color='black' />
                        </View>
                        <Text style={listorders.orderId}>Order Number: #0000-{itemData.Order_Id}</Text>
                        <Text style={listorders.userName}>Total Price: {itemData.Total_Price}</Text>
                        <Text style={listorders.orderPrice}>More details</Text>
                        <View style={listorders.iconMore}>
                            <Ionicons name='chevron-forward' size={22} color='black' />
                        </View>
                    </View>
                </View>
                <View style={listorders.viewIcon}></View>
                <View style={listorders.boxIcon}>
                    <View style={listorders.iconsOrder}>
                        <Ionicons name='calendar' size={22} color='black' />
                        <Text style={listorders.iconsOrderText}>{dateTime}</Text>
                    </View>
                    <View style={listorders.iconsOrder}>
                        <Ionicons name='card' size={22} color='black' />
                        <Text style={listorders.iconsOrderText}>{itemData.Paid ? "paid" : "Not paid"}</Text>
                    </View>
                    <View style={listorders.iconsOrder}>
                        <Ionicons name='checkbox-outline' size={22} color='black' />
                        <Text style={listorders.iconsOrderText}>{
                            itemData.IsActive ? 'Completed' : 'cancel'
                        }</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default OrderBox;