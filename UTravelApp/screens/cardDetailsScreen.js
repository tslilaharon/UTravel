import React, { useState, useEffect } from "react";
//styles 
import { form, payment } from "../utility/style/styles";
import { colors } from "../utility/style/colors";
//ui elements
import {
  ScrollView, Text, View, Keyboard,
  SafeAreaView, TouchableWithoutFeedback,
  CheckBox, Picker
} from 'react-native';
//components
import CustomHeader from '../components/customHeader'
import DemiCard from '../components/demiCard'
import MainButton from '../components/mainButton'
import Input from '../components/input'
//storge
import { _retrieveData, _storeItemData, _storeData } from '../utility/storge';
//validation
import { isEmptyData, validateOwnerName } from "../utility/validation"


const CardDetailsScreen = ({ navigation, route }) => {
  const itemData = route.params.itemData;

  const [cardName, setCardName] = useState("Card Name");
  const [cardNumber, setCardNumber] = useState("Card Number");
  const [expiryYear, setExpiryYear] = useState("00");
  const [expiryMonth, setExpiryMonth] = useState("00");
  const [expirydate, setExpiryDate] = useState("00");
  const [cardCvv, setCardCvv] = useState("");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const SetExpiryDate = () => {
    setExpiryDate( expiryMonth + " / " +  expiryYear)
  }

  const calcTotalPrice = (c) => {
    let total = 0;
    c.forEach((item, i) => {
      total += item.qty * item.Price
    })
    total = (total).toFixed(2)
    setTotalPrice(total)
  };

  const fetchItems = async () => {
    try {
      const c = JSON.parse(await _retrieveData('Cart'))
      if (c[0] != null) {
        setCart(c)
        calcTotalPrice(c)
      }
      else {
        setCart(c)
        calcTotalPrice(c)
      }
    }
    catch (e) {
      console.log(e)
    }
  };

  const createObj = async () => {
    if (isEmptyData(cardName) || isEmptyData(cardNumber) || isEmptyData(cardCvv) || isEmptyData(expiryMonth) || isEmptyData(expiryYear)) {
      alert("One of the details is empty")
      return
    }
    else if (!validateOwnerName(cardName)) {
      alert("The name is not the appropriate length")
      return
    }
    else if (isNaN(cardNumber.replace(/ /g, "")) || isNaN(cardCvv)) {
      alert("Card number and CVV need to contain numbers only")
      return
    }
    else if (cardNumber.length <= 8){
      alert("Card number invalid")
      return
    }
    else if (cardCvv.length != 3) {
      alert("CVV number invalid")
      return
    }
    const obj =
    {
      Cart: cart,
      TotalPrice: totalPrice,
      CardNumber: cardNumber,
      CardName: cardName,
      PaymentType: itemData
    };
    navigation.navigate("OrderPayment", { itemData: obj })
  };

  useEffect(() => {
    let load = true
    fetchItems()
    SetExpiryDate()
    return () => { load = false }
  }, [expiryYear, expiryMonth]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <CustomHeader isMain={false} navigation={navigation} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={{ padding: 20 }}>
          <Text style={payment.label}>Enter Card Details</Text>
          <DemiCard
            name={cardName}
            number={cardNumber}
            edate={expirydate}
            icon={itemData.image}
          />
          <View style={{ padding: 15 }}>
            <Input
              label="Card Name"
              onChangeText={value => setCardName(value)}
              name="Cardname"
              plac=" Full Name"

            />
            <Input
              len={16}
              label="Card Number"
              plac=" ● ● ● ●   ● ● ● ●   ● ● ● ●   ● ● ● ●"
              type="numeric"
              onChangeText={(value) => { setCardNumber(value.replace(/\s/g, "").replace(/(\d{4})/g, '$1 ').trim()) }}
              name="CardNumber"
            />

            <View style={payment.boxordPaid}>
              <Text style={payment.expiryDateLabel}>Expiry Date</Text>
              <Picker
                placeHolder={"YY"}
                selectedValue={expiryYear}
                style={payment.pickerYear}
                onValueChange={(itemValue, itemIndex) => setExpiryYear(itemValue)}
              >
                <Picker.Item label="22" value="22" />
                <Picker.Item label="23" value="23" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="26" value="26" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="28" value="28" />
              </Picker>
              <Picker
                selectedValue={expiryMonth}
                style={payment.pickerMonth}
                onValueChange={(itemValue, itemIndex) => setExpiryMonth(itemValue)}
              >
                <Picker.Item label="01" value="01" />
                <Picker.Item label="02" value="02" />
                <Picker.Item label="03" value="03" />
                <Picker.Item label="04" value="04" />
                <Picker.Item label="05" value="05" />
                <Picker.Item label="06" value="06" />
                <Picker.Item label="07" value="07" />
                <Picker.Item label="08" value="08" />
                <Picker.Item label="09" value="09" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
              </Picker>

              <Input
                len={3}
                label="CVV          "
                plac=" ● ● ●"
                type="numeric"
                onChangeText={value => setCardCvv(value)}
                name="cvv"
              />
            </View>
            <MainButton
              onPress={createObj}
              content={"Next"} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView >
  );
};

export default CardDetailsScreen;
