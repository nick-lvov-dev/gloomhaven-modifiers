import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import HeroView from '../screens/HeroView/HeroView';
import { RootStackParamsList } from './models/RootStackParamsList';
import AddHero from 'src/screens/HeroEdit/HeroEdit';

const Stack = createStackNavigator<RootStackParamsList>();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="HeroView" component={HeroView} options={{ title: 'Hero' }} />
    <Stack.Screen name="HeroEdit" component={AddHero} options={{ title: 'Add Hero' }} />
  </Stack.Navigator>
);
