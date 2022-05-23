// import react & useState
import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
// ui elements
import {
    SafeAreaView, View, Text,
    ScrollView, TouchableWithoutFeedback, Keyboard
} from "react-native";
// styles
import { general, listreview, addreview } from "../utility/style/styles"
import { colors } from "../utility/style/colors"
// components
import AvailableReview from '../components/availableReview'
import CustomHeader from '../components/customHeader'
//storge
import { _retrieveData, url } from "../utility/storge"

const ListReviewsScreen = ({ navigation }) => {

    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([{}]);
    const [items, setItems] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = async (u) => {
        try {
            if (u.User_Id != undefined) {
                let res = await fetch(`${url}/users/orders/${u.User_Id}`)
                let data = await res.json()
                if (data != null) {
                    setOrders(data)
                    fetchItems(data)
                }
                else {
                    setOrders(data)
                }
            }
            else {
                return
            }
        }
        catch (error) {
            console.log(error)
            return
        }
    };

    const fetchItems = async (dataorders) => {
        try {
            let arr = []
            for (let i = 0; i < dataorders.length; i++) {
                let res = await fetch(`${url}/item/itemforreview/${dataorders[i].Order_Id}`)
                let data = await res.json()
                arr.push(data)
            }
            arr = arr.flat()
            setItems(arr)
            setIsLoading(false)
        }
        catch (error) {
            console.log("error", error)
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
                        fetchOrders(u)
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
                <ScrollView style={addreview.container}>
                    <View style={listreview.labelBox}>
                        <Text style={listreview.label}>Share your experiences</Text>
                        <Text style={listreview.textlabel}>Your attractions available for review</Text>
                    </View>
                    {isLoading && <View style={general.boxLoading}>
                        <Text style={addreview.label}>Loading...</Text>
                    </View>}
                    {!isLoading &&
                        <View>
                            {items[0] != null ?
                                items.map((item, index) =>
                                    <AvailableReview
                                        itemData={item}
                                        key={index}
                                        onPress={() => navigation.navigate("AddReviewScreen", { itemData: item })}
                                    />)
                                :
                                <View style={general.NotFoundBox}>
                                    <Text style={addreview.label}>Not found!</Text>
                                    <Text style={listreview.textlabel}>reviews available to review for your bookings</Text>
                                </View>}
                        </View>}
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default ListReviewsScreen;
