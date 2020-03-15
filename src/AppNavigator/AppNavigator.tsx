import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import { RootStackParamsList } from './models/RootStackParamsList';
import AddHero from 'src/screens/HeroEdit/HeroEdit';

const Stack = createStackNavigator<RootStackParamsList>();

export default () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="HeroEdit"
      component={AddHero}
      options={({ route }) => ({ title: route?.params?.hero ? 'Edit Hero' : 'Add Hero' })}
    />
  </Stack.Navigator>
);
