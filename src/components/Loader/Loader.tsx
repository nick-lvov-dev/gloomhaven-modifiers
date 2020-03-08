import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from './styles';

interface Props {
  active?: boolean;
}

export default ({ active = true }: Props) =>
  active ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="333" />
    </View>
  ) : null;
