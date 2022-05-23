// import react & useState
import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
// ui elements
import {
    TouchableOpacity, SafeAreaView, View, Text,
    ScrollView, TextInput, TouchableWithoutFeedback, Keyboard
} from 'react-native';
// styles
import { general, addreview } from '../utility/style/styles';
// components
import MainButton from '../components/mainButton';
import CustomHeader from '../components/customHeader';
//icons
import { AntDesign } from '@expo/vector-icons';
//storge
import { _retrieveData, url } from "../utility/storge"
//validation
import { isEmptyData, checkLength100 } from '../utility/validation';

const AddReview = ({ navigation, route }) => {

    const itemData = route.params.itemData;

    const [user, setUser] = useState({});
    const [attraction, setAttraction] = useState();
    const [review, setReview] = useState();
    const [defaultRating, setDefaultRating] = useState(1);
    const [rating, setRating] = useState([1, 2, 3, 4, 5]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchAttraction = async () => {
        try {
            let res = await fetch(`${url}/attractions/${itemData.Attraction_Id}`)
            let data = await res.json()
            setAttraction(data)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            return
        }
    };

    const AddReview = async () => {
        try {
            await fetch(`${url}/reviews/add`, {
                method: 'POST',
                body: JSON.stringify({
                    User_Id: user.User_Id,
                    Attraction_Id: itemData.Attraction_Id,
                    Rating_Star: defaultRating,
                    Content: review
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return true
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };

    const UpdateReviewed = async () => {
        try {
            await fetch(`${url}/item/reviewed/${itemData.Order_Id}/${itemData.Attraction_Id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        }
        catch (error) {
            console.log(error);
        }
    };

    const Checkdetails = async () => {
        if (isEmptyData(review)) {
            alert('Enter content to the review')
            return
        }
        else if (!checkLength100(review)) {
            alert('review Need Be Less Than 100 Characters')
            return
        }
        let reviewData = await AddReview(user.User_Id, itemData.Attraction_Id, defaultRating, review)
        if (reviewData == true) {
            await UpdateReviewed()
            alert('Thank you for sharing your experience')
            navigation.navigate('AttractionScreen', { itemData: attraction })
        }
        else {
            alert('The review was not added, try again')
        }
    };

    useEffect(() => {
        let load = true
        fetchAttraction()
        return () => {load = false}
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            const fetchUser = async () => {
                try {
                    const u = JSON.parse(await _retrieveData("user"))
                    if (isActive) {
                        setUser(u)
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
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader isMain={true} navigation={navigation} />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView style={addreview.container}>
                    <Text style={[{ marginTop: 20 }, addreview.label]}>Attraction Details</Text>
                    {isLoading && <View style={addreview.boxDetails}>
                        <Text style={addreview.label}>Loading...</Text>
                    </View>}
                    {attraction &&
                        <View style={addreview.boxDetails}>
                            <View style={addreview.detailsRow}>
                                <Text style={addreview.titleDetails}>Attraction :</Text>
                                <Text style={addreview.details}>{attraction.Attraction_Name}</Text>
                            </View>
                            <View style={addreview.detailsRow}>
                                <Text style={addreview.titleDetails}>Location :</Text>
                                <Text style={addreview.details}>{attraction.City_Name}</Text>
                            </View>
                            <View style={addreview.detailsRow}>
                                <Text style={addreview.titleDetails}>Price :</Text>
                                <Text style={addreview.details}>{attraction.Price}</Text>
                            </View>
                            <View style={addreview.detailsRow}>
                                <Text style={addreview.titleDetails}>Quantity :</Text>
                                <Text style={addreview.details}>{itemData.Quantity}</Text>
                            </View>

                        </View>
                    }
                    {attraction &&
                        <View style={addreview.Box}>
                            <View style={addreview.field}>
                                <Text style={addreview.label}>Rating</Text>
                                <View style={addreview.fieldRow}>
                                    {rating.map((item, key) => {
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                key={item}
                                                onPress={() => setDefaultRating(item)}>
                                                <AntDesign
                                                    style={general.star}
                                                    size={30}
                                                    name={item <= defaultRating ? 'star' : 'staro'} />
                                            </TouchableOpacity>)})}
                                    <Text style={addreview.label}> {defaultRating + ' / ' + rating.length}</Text>
                                </View>

                                <Text style={addreview.label}>Review</Text>
                                <TextInput
                                    onChangeText={value => setReview(value)}
                                    name='review'
                                    placeholder='How would you describe your experience at Attraction?'
                                    multiline={true}
                                    numberOfLines={10}
                                    style={addreview.input}/>
                            </View>
                            <MainButton
                                onPress={Checkdetails}
                                content={'Submit'}
                            />
                        </View>
                    }
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default AddReview;