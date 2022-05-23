import React, { useState, useEffect } from "react";
//styles
import { listreview } from "../utility/style/styles";
//ui elements
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { _retrieveData, url } from "../utility/storge"

const AvailableReview = ({ itemData , onPress}) => {

    const [attraction, setAttraction] = useState({});

    const fetchAttraction = async () => {
        try {
            if (itemData.Attraction_Id != undefined) {
                let res = await fetch(`${url}/attractions/${itemData.Attraction_Id}`)
                let data = await res.json()
                setAttraction(data)
            }
            else {
                return
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        let load = true
        fetchAttraction()
        return () => {load = false}
    }, []);

    return (
        <TouchableOpacity onPress={onPress} >
            <View style={listreview.imgBox}>
                <View style={listreview.abs}>
                    <Image style={listreview.imgStyle} source={{ uri: attraction.Image }} />
                </View>
                <View style={listreview.textBox}>
                    <Text style={listreview.name}>{attraction.Attraction_Name}</Text>
                    <Text style={listreview.city}>{attraction.City_Name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
export default AvailableReview;
