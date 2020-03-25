import React from 'react';
import { View, Image, StyleProp, FlexStyle } from 'react-native';
import { Modifier } from 'src/core/Modifiers/models/Modifier';
import styles from './styles';
import { cardShadow } from 'assets/images';
import { width as screenWidth } from 'src/core/Dimensions';

const getModifierWidth = (width?: number) => width ?? screenWidth / 2;
const getModifierHeight = (width?: number) => (getModifierWidth(width) / 3) * 2;
const getModifierBorderRadius = (width?: number) => getModifierHeight(width) / 10;
export const getModifierStyle = (width?: number) => ({
  width: getModifierWidth(width),
  height: getModifierHeight(width),
  borderRadius: getModifierBorderRadius(width),
});

interface Props {
  modifier: Modifier;
  width?: number;
  style?: StyleProp<FlexStyle>;
}
export default ({ modifier, width, style }: Props) => {
  const cardStyle = getModifierStyle(width);
  return (
    <View style={[cardStyle, style]}>
      <Image source={modifier.image} style={cardStyle} />
      <Image source={cardShadow} style={[cardStyle, styles.shadow]} />
    </View>
  );
};
