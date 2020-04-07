import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Dash = () => <View style={styles.dash} />;

export default () => (
  <View style={{ alignItems: 'center' }}>
    <View style={styles.arrow} />
    <Dash />
    <Dash />
    <Dash />
    <Dash />
    <Dash />
    <Text style={styles.text}>Swipe up to see history</Text>
  </View>
);
