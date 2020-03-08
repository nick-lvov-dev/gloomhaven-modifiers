import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface Props {
  label: string;
  children?: ReactNode;
}

export default ({ label, children }: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);
