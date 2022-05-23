import React, { useState, useEffect } from "react";
//styles 
import { cart } from "../utility/style/styles";
import { colors } from "../utility/style/colors";
//ui elements
import { TouchableOpacity, Text, View, Image } from 'react-native';
//icons
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//components
import Quantity from './quantity'
//storge
import { _removeItemData, _updateItemData } from '../utility/storge';

const CartItem = ({ itemData, reload }) => {
    const [qty, setQty] = useState(itemData.qty);

    useEffect(() => {
        updateItemInCart()
    }, [qty]);

    const updateItemInCart = async () => {
        await _updateItemData('Cart', itemData, qty)
        reload();
    }

    const RemoveItem = async () => {
        await _removeItemData("Cart", itemData)
        reload();
    }

    return (
        <View style={cart.AttBox}>
            <View style={cart.boxDetails}>
                <Image
                    style={{
                        height: 120,
                        width: 100,
                        backgroundColor: 'gray',
                        borderRadius: 10,
                    }}
                    source={{
                        uri: itemData.Image
                    }}
                />
                <View style={cart.AttDetails}>
                    <TouchableOpacity style={cart.iconInfo} onPress={RemoveItem}>
                        <Ionicons name="close" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={cart.AttName}>{itemData.Attraction_Name}</Text>
                    <Text style={cart.AttLoc}>
                        <MaterialCommunityIcons name='google-maps' size={15} color={colors.dark} />
                        {itemData.City_Name}</Text>
                    <View style={cart.viewIcon}></View>
                    <View style={cart.AttPrice}>
                        <Quantity
                            onPressminus={() => qty > 1 ? setQty(qty - 1) : setQty(qty)}
                            content={qty}
                            onPressplus={() => qty < 10 ? setQty(qty + 1) : setQty(qty)}
                        />
                        <Text style={{ marginVertical: 2, fontSize: 22, color: colors.dark }}>
                            $ {(itemData.Price * qty).toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default CartItem;