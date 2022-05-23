//import React Navigation
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//LogIn Context
import { useLogIn } from '../utility/LogInContext'
//Validation Screens 
import Welcome from '../screens/welcomeScreen'
import LogIn from '../screens/logInScreen'
import SignUp from '../screens/singUpScreen'
import LogInBusiness from '../screens/businessLogInScreen'
import SignUpBusiness from '../screens/businessSingUpScreen'
import ForgotPassword from '../screens/forgotPasswordScreen'
//Business Screens
import BusinessProfile from '../screens/businessProfileScreen'
import BusinessEditProfile from '../screens/businessEditProfileScreen'
import BusinessSettingsScreen from '../screens/businessSettingsScreen'
import BusinessAttraction from '../screens/businessAttractionScreen'
import BusinessEditAttraction from '../screens/businessEditAttractionScreen'
import AddAttraction from '../screens/businessAddAttractionScreen'
import AttractionsScreen from '../screens/businessAttractionsScreen'
//Home Screens 
import Home from '../screens/homeScreen'
import City from '../screens/cityScreen'
import Attraction from '../screens/attractionScreen'
import ContactUs from '../screens/contactUsScreen'
import AllCities from '../screens/allCitiesScreen'
//Profile Screens
import Profile from '../screens/profileScreen'
import EditProfile from '../screens/editProfileScreen'
import Settings from '../screens/settingsScreen'
import AddReview from '../screens/addReviewScreen'
import ListReviewsScreen from '../screens/listReviewsScreen'
//user Orders
import ShoppingCart from '../screens/cartScreen'
import OrdersListScreen from '../screens/ordersListScreen'
import OrderScreen from '../screens/orderScreen'
import PaymentTypeScreen from '../screens/paymentTypeScreen'
import CardDetailsScreen from '../screens/cardDetailsScreen'
import OrderPayment from '../screens/orderPaymentScreen'

//Drawer
const DrawerUser = createDrawerNavigator();
const UserDrawer = () => {
  return (
    <DrawerUser.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false
      }}>
      <DrawerUser.Screen
        name='Home'
        component={HomeStack} />
      <DrawerUser.Screen
        name='Profile'
        component={ProfileStack} />
      <DrawerUser.Screen
        name='All Cities'
        component={AllCities} />
      <DrawerUser.Screen
        name='Contact Us'
        component={ContactUs} />
      <DrawerUser.Screen
        name='Settings'
        component={Settings} />
    </DrawerUser.Navigator>
  );
}
const DrawerBusiness = createDrawerNavigator();
const BusinessDrawer = () => {
  return (
    <DrawerBusiness.Navigator
      initialRouteName='BusinessProfile'
      screenOptions={{
        headerShown: false
      }}>
      <DrawerBusiness.Screen
        name='Business Profile'
        component={BusinessProfileStack} />
      <DrawerBusiness.Screen
        name='Business Settings'
        component={BusinessSettingsScreen} />
    </DrawerBusiness.Navigator>
  );
}


//Stack
const StackValidation = createNativeStackNavigator();
const ValidationStack = () => {
  return (
    <StackValidation.Navigator
      initialRouteName='WelcomeScreen'
      screenOptions={{
        headerShown: false
      }}>
      <StackValidation.Screen
        name='WelcomeScreen'
        component={Welcome} />
      <StackValidation.Screen
        name='LogInScreen'
        component={LogIn} />
      <StackValidation.Screen
        name='SignUpScreen'
        component={SignUp} />
      <StackValidation.Screen
        name='LogInBusinessScreen'
        component={LogInBusiness} />
      <StackValidation.Screen
        name='SignUpBusinessScreen'
        component={SignUpBusiness} />
      <StackValidation.Screen
        name='ForgotPasswordScreen'
        component={ForgotPassword} />
    </StackValidation.Navigator>
  );
}
const StackHome = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <StackHome.Navigator initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false
      }}>
      <StackHome.Screen
        name='HomeScreen'
        component={Home} />
      <StackHome.Screen
        name='All Cities'
        component={AllCities} />
      <StackHome.Screen
        name='CityScreen'
        component={City} />
      <StackHome.Screen
        name='AttractionScreen'
        component={Attraction} />
      <StackHome.Screen
        name='ShoppingCartScreen'
        component={ShoppingCart} />
      <StackHome.Screen
        name='PaymentTypeScreen'
        component={PaymentTypeScreen} />
      <StackHome.Screen
        name='CardDetailsScreen'
        component={CardDetailsScreen} />
      <StackHome.Screen
        name='OrderPayment'
        component={OrderPayment} />
      <StackHome.Screen
        name='WelcomeScreen'
        component={Welcome} />
    </StackHome.Navigator>
  );
}
const StackProfile = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <StackProfile.Navigator initialRouteName='ProfileScreen'
      screenOptions={{
        headerShown: false
      }}>
      <StackProfile.Screen
        name='ProfileScreen'
        component={Profile} />
      <StackProfile.Screen
        name='EditProfileScreen'
        component={EditProfile} />
      <StackProfile.Screen
        name='AddReviewScreen'
        component={AddReview} />
      <StackProfile.Screen
        name='SettingsScreen'
        component={Settings} />
      <StackProfile.Screen
        name='ListReviewsScreen'
        component={ListReviewsScreen} />
      <StackProfile.Screen
        name='OrdersListScreen'
        component={OrdersListScreen} />
      <StackProfile.Screen
        name='OrderScreen'
        component={OrderScreen} />
      <StackProfile.Screen
        name='PaymentTypeScreen'
        component={PaymentTypeScreen} />
      <StackProfile.Screen
        name='ShoppingCartScreen'
        component={ShoppingCart} />
    </StackProfile.Navigator>
  );
}
const StackBusinessProfile = createNativeStackNavigator();
const BusinessProfileStack = () => {
  return (
    <StackBusinessProfile.Navigator
      initialRouteName='BusinessProfileScreen'
      screenOptions={{
        headerShown: false
      }}>
      <StackBusinessProfile.Screen
        name='BusinessProfileScreen'
        component={BusinessProfile} />
      <StackBusinessProfile.Screen
        name='AttractionsScreen'
        component={AttractionsScreen} />
      <StackBusinessProfile.Screen
        name='BusinessEditProfileScreen'
        component={BusinessEditProfile} />
      <StackBusinessProfile.Screen
        name='BusinessAttractionScreen'
        component={BusinessAttraction} />
      <StackBusinessProfile.Screen
        name='BusinessEditAttractionScreen'
        component={BusinessEditAttraction} />
      <StackBusinessProfile.Screen
        name='AddAttractionScreen'
        component={AddAttraction} />
      <StackBusinessProfile.Screen
        name='BusinessSettingsScreen'
        component={BusinessSettingsScreen} />
      <StackBusinessProfile.Screen
        name='WelcomeScreen'
        component={Welcome} />
    </StackBusinessProfile.Navigator>
  );
}

//Main Stack 
const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ValidationStack' component={ValidationStack} />
      <Stack.Screen name='HomeScreen' component={UserDrawer} />
      <Stack.Screen name='BusinessProfileScreen' component={BusinessDrawer} />
    </Stack.Navigator>
  );
};

//Main Root
const MainRoot = () => {
  const { isLogInUser, isLogInBusiness } = useLogIn()

  const CheckTypeUser = () => {
    if (isLogInUser == 'true') {
      return 'user'
    }
    else if (isLogInBusiness == 'true') {
      return 'business'
    }
    else {
      return 'Unregistered'
    }
  };

  let type = CheckTypeUser();
  return (
    type == 'user' ? <UserDrawer /> : type == 'business' ? <BusinessDrawer /> : type == 'Unregistered' ? <MainNavigator /> : <MainNavigator />
  );
};

export default MainRoot;

