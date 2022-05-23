import React from "react";
//styles 
import { orders } from "../utility/style/styles";
//ui elements
import {  Text, View, Image } from 'react-native';

const ItemInOrder = ({itemData, orderDate}) => {
    return (
        <View style={orders.imgBox}>
            <View style={orders.abs}>
                <Image 
                style={orders.imgStyle} 
                source={{ uri: itemData.Image }} />
            </View>
            <View style={orders.textBox}>
                <Text style={orders.labelDetails}>{itemData.Attraction_Name}</Text>
                <Text style={orders.textDetails}>{itemData.City_Name}</Text>
                <View style={orders.viewIcon}></View>
                <View style={orders.itemRow}>
                    <View style={orders.boxOrder}>
                        <Text style={orders.textDetails}>{"Price:"}</Text>
                        <Text style={orders.textDet}>{itemData.Price}</Text>
                    </View>
                    <View style={orders.boxOrder}>
                        <Text style={orders.textDetails}>{"Quantity:"}</Text>
                        <Text style={orders.textDet}>{orderDate.Quantity}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default ItemInOrder;