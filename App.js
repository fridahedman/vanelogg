import * as React from 'react';
import {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Home from './components/Home.js';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  // Hide splash screen when app is finished loading
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}
