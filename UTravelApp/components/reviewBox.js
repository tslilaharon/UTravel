import React, { useState, useEffect } from 'react';
//styles
import { review } from '../utility/style/styles';
//ui elements
import { Text, View, Image } from 'react-native';
//components
import RatingStars from '../components/ratingStars';
//storge
import { url, _retrieveData } from '../utility/storge';

const ReviewBox = ({ itemData }) => {
    const [found, setFound] = useState(false);
    const [user, setUser] = useState({});

    const fetchUser = async () => {
        let res = await fetch(`${url}/users/${itemData.User_Id}`)
        let data = await res.json()
        setUser(data)
        setFound(true)
    }

    useEffect(() => {
        let load = true
        fetchUser()
        return () => {load = false}
    }, []);

    return (
        <View style={review.imgBox}>
            <View style={review.abs}>
                <Image style={review.imgStyle} source={{ uri: user.Image }} />
            </View>
            <View style={review.ratingBox}>
                <RatingStars ratings={itemData.Rating_Star} />
            </View>
            <Text style={review.title}>{user.User_Name}</Text>
            <Text style={review.location}>{itemData.Content}</Text>
        </View>
    );
}
export default ReviewBox;
