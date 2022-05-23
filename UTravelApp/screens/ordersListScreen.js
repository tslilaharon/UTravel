// import react & useState
import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
// ui elements
import {
    SafeAreaView, View, Text,
    ScrollView, TouchableWithoutFeedback, Keyboard
} from "react-native";
// styles
import { general, listorders } from "../utility/style/styles"
// components
import OrderBox from '../components/orderBox'
import CustomHeader from '../components/customHeader'
// icons
import { _retrieveData, url } from "../utility/storge"

const OrdersListScreen = ({ navigation }) => {

    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    const fetcOrders = async (u) => {
        try {
            let res = await fetch(`${url}/users/orders/${u.User_Id}`)
            let data = await res.json()
            if (data != null) {
                setOrders(data)
                setIsLoading(false)
            }
            else {
                setOrders(data)
                setIsLoading(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            const fetchUser = async () => {
                try {
                    const u = JSON.parse(await _retrieveData("user"))
                    if (isActive) {
                        setUser(u)
                        fetcOrders(u)
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader isMain={false} navigation={navigation} />
                <ScrollView style={listorders.container}>
                    <View style={listorders.labelBox}>
                        <Text style={listorders.label}>Orders History</Text>
                    </View>
                    {isLoading && <View style={general.boxLoading}>
                        <Text style={listorders.label}>Loading...</Text>
                    </View>}
                    {!isLoading &&
                        <View style={listorders.cardContainer}>
                            {orders[0] != null ?
                                orders.map((item, index) =>
                                    <OrderBox
                                        key={index}
                                        itemData={item}
                                        onPress={() => navigation.navigate(("OrderScreen"), { itemData: item })}
                                    />)
                                :
                                <View style={general.NotFoundBox}>
                                    <Text style={listorders.label}>Not found!</Text>
                                    <Text style={listorders.textlabel}>Your Orders history</Text>
                                </View>}
                        </View>}
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default OrdersListScreen;

