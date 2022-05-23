import React from 'react';
//Navigation Routes
import { NavigationContainer } from '@react-navigation/native';
import MainRoot from './navigators/navigationRoutes'
//Context Login Provider
import LoginProvider from './utility/LogInContext';

export default function App() {
  return (

    <LoginProvider>
      <NavigationContainer>
        <MainRoot/>
      </NavigationContainer>
    </LoginProvider>
  );
}