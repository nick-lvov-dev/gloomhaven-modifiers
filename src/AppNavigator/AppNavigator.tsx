import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import { RootStackParamsList } from './models/RootStackParamsList';
import HeroEditScreen from 'src/screens/HeroEdit/HeroEditScreen';

const Stack = createStackNavigator<RootStackParamsList>();

export default () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="HeroEdit"
      component={HeroEditScreen}
      options={({ route }) => ({ title: route?.params?.hero ? 'Edit Hero' : 'Add Hero' })}
    />
  </Stack.Navigator>
);
