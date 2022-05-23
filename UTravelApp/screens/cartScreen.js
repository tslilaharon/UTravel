import React, { useState, useEffect } from 'react';
//styles
import { general, carttotal } from '../utility/style/styles';
import { colors } from '../utility/style/colors';
//ui elements
import {
  ScrollView, SafeAreaView,
  Image, View, Text
} from 'react-native';
//components 
import CartItem from '../components/cartItem';
import MainButton from '../components/mainButton';
import CustomHeader from '../components/customHeader';
//storge
import { _retrieveData, _storeItemData, _storeData } from '../utility/storge';

const ShoppingCart = ({ navigation }) => {

  const [cart, setCart] = useState([]);
  const [found, setFound] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const calcTotalPrice = (c) => {
    let total = 0;
    if (c) {
      c.map((item, i) =>
        total += item.qty * item.Price,
      )
      total = (total).toFixed(2)
      setTotalPrice(total)
    }
  };

  const fetchItems = async () => {
    try {
      const c = JSON.parse(await _retrieveData('Cart'))
      if (c[0] != null) {
        setCart(c)
        setFound(true)
        calcTotalPrice(c)
      }
      else {
        setCart(c)
        setFound(false)
        calcTotalPrice(c)
      }
    }
    catch (e) {
      console.log(e)
    }
  };

  const reloadData = () => {
    fetchItems();
  }

  useEffect(() => {
    let load = true
    fetchItems()
    return () => { load = false }
  }, []);



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader isMain={true} navigation={navigation} />
      <ScrollView style={general.container}>
        <View style={{ margin: 20 }}>
          <Text style={carttotal.totalLabel}>Cart</Text>
          {found ?
            cart.map((item, index) =>
              <CartItem
                itemData={item}
                key={item.Attraction_Id}
                reload={reloadData}
              />)
            :
            <View style={{ marginVertical: "30%" }}>
              <Image source={require("../assets/logo/empty_cart.png")} style={{ width: '100%', height: 250, borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }} />
            </View>
          }
        </View>
      </ScrollView>
      <View style={{ paddingVertical: 10, backgroundColor: colors.white }}>
        {cart.length > 0 ?
          <View style={carttotal.totalBox}>
            <View style={carttotal.total}>
              <View style={carttotal.amountView}>
                <Text style={{ fontSize: 16, color: colors.dark }}>Taxes:</Text>
                <Text style={{ fontSize: 16, color: colors.dark }}>$00.00</Text>
              </View>
              <View style={carttotal.amountView}>
                <Text style={{ fontSize: 18, color: colors.dimGray }}>Total Price:</Text>
                <Text style={{ fontSize: 18, color: colors.dimGray }}>${totalPrice}</Text>
              </View>
              <MainButton
                onPress={() => navigation.navigate('PaymentTypeScreen')}
                content={'Checkout'} />
            </View>
          </View>
          :
          <View style={{ margin: 20 }}>
            <MainButton
              onPress={() => navigation.navigate('HomeScreen')}
              content={'Shop Now'} />
          </View>
        }
      </View>
    </SafeAreaView >
  );
}
export default ShoppingCart;
