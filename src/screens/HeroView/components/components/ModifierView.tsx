import React from 'react';
import { View, Image, StyleProp, ViewStyle } from 'react-native';
import { Modifier } from 'src/core/Modifiers/models/Modifier';
import styles from './styles';
import { cardShadow } from 'assets/images';

interface Props {
  modifier: Modifier;
  style?: StyleProp<ViewStyle>;
}

export default ({ modifier, style }: Props) => (
  <View style={[styles.modifier, style]}>
    <Image source={modifier.image} style={styles.modifier} />
    <Image source={cardShadow} style={[styles.modifier, styles.shadow]} />
  </View>
);
