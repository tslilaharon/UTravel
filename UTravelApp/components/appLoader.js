import React from "react";
import LottieView from "lottie-react-native"
//styles
import { colors } from "../utility/style/colors";
//ui elements
import { Text, View } from 'react-native';

const AppLoader = () => {
    return (
        <View style={{ backgroundColor: colors.white, justifyContent: 'center',
         alignItems: 'center', zIndex: 1 }}>
            <LottieView source={'../assets/logo/Loading.json'} autoPlay loop />
        </View>
    );
}
export default AppLoader;