// import react & useState
import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
//styles 
import { general, orders } from "../utility/style/styles";
import { colors } from "../utility/style/colors";
//ui elements
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/customHeader'
import ItemInOrder from '../components/itemInOrder'
import MainButton from '../components/mainButton'

//storge
import { _retrieveData, _removeData, url } from "../utility/storge"

const OrderPayment = ({ route, navigation }) => {

    const itemData = route.params.itemData;
    const [user, setUser] = useState({});
    const [order, setOrder] = useState({});

    const AddOrder = async (u) => {
        try {
            let res = await fetch(`${url}/orders/add`, {
                method: 'POST',
                body: JSON.stringify({
                    User_Id: u,
                    Total_Price: itemData.TotalPrice,
                    Order_info: null
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await res.json()
            console.log("AddOrder", "succeed")
            setOrder(data[0])
            return data[0]
        }
        catch (error) {
            console.log(error);
        }
    };

    const AddItems = async (o, c) => {
        try {
            await fetch(`${url}/item/add`, {
                method: 'POST',
                body: JSON.stringify({
                    Order_Id: o.Order_Id,
                    Attraction_Id: c.Attraction_Id,
                    Business_Id: c.Business_Id,
                    Quantity: c.qty
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return true
        }
        catch (error) {
            console.log(error)
            return false
        }
    };

    const Checkdetails = async () => {
        let newOrder = await AddOrder(user.User_Id)
        for (let i = 0; i < itemData.Cart.length; i++) {
            if (!itemData.Cart[i].In_Stock) {
                alert(itemData.Cart[i].Attraction_name + ' - The attraction is not available now')
                UpdateCancel(newOrder)
                return
            }
            else if (itemData.Cart[i].Stock_Quantity < itemData.Cart[i].qty) {
                alert(itemData.Cart[i].Stock_Quantity + 'tickets can be booked for' + itemData.Cart[i].Attraction_name)
                UpdateCancel(newOrder)
                return
            }
        }

        for (let i = 0; i < itemData.Cart.length; i++) {
            if (itemData.Cart[i].In_Stock && itemData.Cart[i].Stock_Quantity > itemData.Cart[i].qty) {
                await AddItems(newOrder, itemData.Cart[i])
            }
        }
        await UpdatePaid(newOrder)
        await _removeData("Cart")
        alert('Thank you for buying in UTravel App')
        navigation.navigate('HomeScreen')
    };

    const UpdatePaid = async (o) => {
        try {
            await fetch(`${url}/orders/paid/${o.Order_Id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    Paid: 1
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            console.log("UpdatePaid" + "succeed")
        }
        catch (error) {
            console.log(error);
        }
    };

    const UpdateCancel = async (o) => {
        try {
            await fetch(`${url}/orders/cancel/${o.Order_Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            console.log("UpdateCancel" + "succeed")
        }
        catch (error) {
            console.log(error);
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
                    }
                }
                catch (e) {
                    console.log("error create order", e)
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
            <CustomHeader isMain={false} navigation={navigation} />
            <ScrollView style={orders.container}>
                <View style={{ margin: 30 }}>
                    <Text style={orders.detailsLebel}>Order Details</Text>
                    <View style={orders.detailView}>
                        <View style={orders.boxOrder}>
                            <Text style={orders.textDetails}>Order Number </Text>
                            <Text style={orders.textDet}>#0000-{order.Order_Id}</Text>
                        </View>
                        <View style={orders.boxOrder}>
                            <Text style={orders.textDetails}>Order Date</Text>
                            <Text style={orders.textDet}>00/00</Text>
                        </View>
                    </View>
                    <Text style={orders.detailsLebel}>Card Holder</Text>
                    <View style={orders.boxordPaid}>
                        <View style={orders.boxPaid}>
                            <Text style={orders.textDetails}>Card Type</Text>
                            <Text style={[{ margin: 5 }, orders.textDet]}>{itemData.PaymentType.name}</Text>
                        </View>
                        <View style={orders.boxPaid}>
                            <Text style={orders.textDetails}>Card Number</Text>
                            <Text style={[{ margin: 5 }, orders.textDet]}>●●●● ●●●● {itemData.CardNumber.substr(-4)}</Text>
                        </View>
                    </View>
                    <Text style={orders.detailsLebel}>Payment</Text>
                    <View style={orders.viewInfo}>
                        <View style={orders.PriceRow}>
                            <Text style={orders.PriceText}>Total Price</Text>
                            <Text style={orders.PriceText}>{itemData.TotalPrice}</Text>
                        </View>
                    </View>
                    <MainButton
                        onPress={Checkdetails}
                        content={"Pay Now"} />
                </View >
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderPayment;
