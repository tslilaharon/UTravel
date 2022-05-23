import React, { useState } from "react";
//styles 
import { orders, payment } from "../utility/style/styles";
import { colors } from "../utility/style/colors";
import { dataCard } from "../utility/cardType";
//ui elements
import { ScrollView, Text, View, SafeAreaView } from 'react-native';
//components
import CustomHeader from '../components/customHeader'
import CardItem from '../components/cardItem'
import MainButton from '../components/mainButton'

const PaymentTypeScreen = ({ navigation }) => {
    const [selectedCard, setSelectedCard] = useState(dataCard[0])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <CustomHeader isMain={false} navigation={navigation} />
            <ScrollView style={{ padding: 20 }}>
                <Text style={payment.label}>Select Payment Option</Text>
                <View>
                    {dataCard.map((item, index) =>
                        <CardItem
                            itemData={item}
                            key={item.id}
                            isSelected={selectedCard.id == item.id}
                            onPress={() => setSelectedCard(item)} />)}
                </View>
                <MainButton
                    onPress={() => navigation.navigate("CardDetailsScreen", { itemData: selectedCard })}
                    content={"Next"} />
            </ScrollView>
        </SafeAreaView >
    );
};

export default PaymentTypeScreen;
