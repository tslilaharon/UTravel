// import react & useState
import React, { useState, useEffect } from "react";
//styles 
import { general, orders } from "../utility/style/styles";
import { colors } from "../utility/style/colors";
//ui elements
import { Text, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/customHeader'
import ItemInOrder from '../components/itemInOrder'
//storge
import { _retrieveData, url } from "../utility/storge"

const OrderScreen = ({ route, navigation }) => {

    const itemData = route.params.itemData;
    const [items, setItems] = useState([{}]);
    const [attraction, setAttraction] = useState([{}]);
    const [dateTime, setDateTime] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const OrderDateTime = () => {
        if (itemData.Order_Date !== undefined) {
            let s = itemData.Order_Date
            let res = s.substring(0, 19).replace('T', ' ')
            setDateTime(res)
        }
        return
    };

    const fetchItems = async () => {
        let res = await fetch(`${url}/item/iteminorder/${itemData.Order_Id}`)
        let data = await res.json()
        setItems(data)
        fetchAttraction(data)
    };

    const fetchAttraction = async (Orderitems) => {
        let arr = []
        for (let i = 0; i < Orderitems.length; i++) {
            let res = await fetch(`${url}/attractions/${Orderitems[i].Attraction_Id}`)
            let data = await res.json()
            arr.push(data)
        }
        setAttraction(arr)
        setIsLoading(false)
    };

    const UpdateStockAfterDelete = async (Orderitems) => {
        try {
            for (let i = 0; i < Orderitems.length; i++) {
                await fetch(`${url}/attractions/UpdateStock/${Orderitems[i].Attraction_Id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        Stock_Quantity: Orderitems[i].Quantity
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            }
            console.log("Stock Update " + "succeed")
        }
        catch (error) {
            console.log(error);
        }
    };

    const deleteOrder = async () => {
        try {
            let res = await fetch(`${url}/orders/delete/${itemData.Order_Id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await res
            if (data != null) {
                UpdateStockAfterDelete(items)
                alert('Order Deleted!')
                navigation.navigate('OrdersListScreen')
            }
        }
        catch (e) {
            console.log(e)
        }
    };

    const showConfirmDialog = () => {
        return Alert.alert(
            "Cancel Order?",
            "Are you sure you want to cancel this order?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => { deleteOrder() },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };

    useEffect(() => {
        let load = true
        fetchItems()
        OrderDateTime()
        return () => { load = false }
    }, [itemData]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isMain={false} navigation={navigation} />
            <ScrollView style={orders.container}>
                <View style={{ margin: 20 }}>
                    <View style={orders.detailView}>
                        <View style={orders.screen}>
                            <Ionicons name={"close-outline"} style={orders.deleteOrderIcon} onPress={() => showConfirmDialog()} />
                        </View>
                        <View style={orders.detailsBox}>
                            <View>
                                <Text style={orders.labelDetails}>Order details</Text>
                                <View style={orders.boxOrder}>
                                    <Text style={orders.textDetails}>Order Number </Text>
                                    <Text style={orders.textDet}>#0000-{itemData.Order_Id}</Text>
                                </View>
                                <View style={orders.boxOrder}>
                                    <Text style={orders.textDetails}>Payment complete</Text>
                                    <Text style={orders.textDet}><Ionicons name={itemData.IsActive ? "checkmark-sharp" : "close-sharp"} size={18} color="#B8B8B8" /></Text>
                                </View>
                            </View>
                        </View>
                        <View style={orders.detailsRow}>
                            <Text style={orders.textItem}>{items.length} Items</Text>
                            <View style={orders.textbox}>
                                <Text>Total Price: </Text>
                                <Text>{itemData.Total_Price}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{ fontSize: 20, margin: 10 }}>Order Items</Text>
                    {isLoading && <View style={general.boxLoading}>
                        <Text style={orders.labelDetails}>Loading...</Text>
                    </View>}
                    {!isLoading && <View >
                        {attraction.map((item, index) =>
                            <ItemInOrder
                                key={index}
                                itemData={item}
                                orderDate={items[index]}
                            />)}
                    </View>}
                    <View style={orders.boxordPaid}>
                        <View style={orders.boxPaid}>
                            <Text style={{ color: colors.lightText }}>Order date</Text>
                            <Text style={{ textAlign: "center", margin: 2 }} >{dateTime}</Text>
                        </View>
                        <View style={orders.boxPaid}>
                            <Text style={{ color: colors.lightText }}>{itemData.Paid ? "paid" : "Not paid"}</Text>
                            <Text style={{ textAlign: "center", margin: 2 }}>{itemData.Paid ? "successfully" : "Canceled"}</Text>
                        </View>
                    </View>
                    {itemData.Order_Info && <View style={orders.viewInfo}>
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>Order Info</Text>
                        <Text style={{ color: colors.lightText }}>
                            {itemData.Order_Info}
                        </Text>
                    </View>}
                </View >
            </ScrollView>
        </SafeAreaView>
    );
};

export default OrderScreen;
