import React from "react";
//styles 
import {card } from "../utility/style/styles";
//ui elements
import {
    Text, ImageBackground, View, Image
} from 'react-native';

const DemoCard = ({ name, icon, number, edate }) => {
    return (
        <View >
            <ImageBackground
                source={require("../assets/logo/CreditCardb.png")}
                style={card.bgcard}>
                <Image
                    style={card.iconcard}
                    source={icon || null}
                    resizeMode="center"
                />
                <View style={card.Viewcard}>
                    <View style={{ alignItems: 'center', margin: 20 }}>
                        <Text style={card.labelCard}>
                            {number}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={card.textCard}>
                            {name}
                        </Text>
                        <Text style={card.textCard}>
                            {edate}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View >
    );
};

export default DemoCard;
