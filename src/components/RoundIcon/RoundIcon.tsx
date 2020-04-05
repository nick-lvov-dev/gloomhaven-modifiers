import React from 'react';
import { View, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { roundShadow } from 'assets/images';
import styles from './styles';

export default ({
  imageStyle,
  shadowStyle,
  style,
  image,
  withBackground,
  noShadow,
}: {
  tintColor?: string;
  style?: StyleProp<ViewStyle>;
  image: any;
  imageStyle?: StyleProp<ImageStyle>;
  shadowStyle?: StyleProp<ImageStyle>;
  withBackground?: boolean;
  noShadow?: boolean;
}) => (
  <View>
    <View style={[withBackground ? styles.container : null, style]}>
      <Image source={image} style={[styles.icon, withBackground ? styles.iconWithBackground : null, imageStyle]} />
    </View>
    {!noShadow ? <Image source={roundShadow} style={[styles.shadow, shadowStyle]} /> : null}
  </View>
);
