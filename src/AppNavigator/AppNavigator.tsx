import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import HeroView from '../screens/HeroView/HeroView';
import { RootStackParamsList } from './models/RootStackParamsList';
import AddHero from 'src/screens/HeroEdit/HeroEdit';
import { Platform } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';

const Stack = createStackNavigator<RootStackParamsList>();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleStyle: Platform.select({ ios: { fontFamily: FontFamily.Regular }, android: { fontFamily: 'Roboto' } }),
    }}>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="HeroView" component={HeroView} options={{ title: 'Hero' }} />
    <Stack.Screen
      name="HeroEdit"
      component={AddHero}
      options={({ route }) => ({ title: route?.params?.hero ? 'Edit Hero' : 'Add Hero' })}
    />
  </Stack.Navigator>
);
