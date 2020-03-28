import React, { ReactNode } from 'react';
import { Text, View, StyleProp, ViewStyle } from 'react-native';
import styles from './styles';

interface Props {
  label: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export default ({ label, style, children }: Props) => (
  <View style={[styles.container, style]}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);
