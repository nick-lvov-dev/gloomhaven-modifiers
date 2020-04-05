import React from 'react';
import { View, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { effectShadow } from 'assets/images';
import styles from './styles';

export default ({
  imageStyle,
  shadowStyle,
  style,
  image,
  noShadow,
}: {
  tintColor?: string;
  style?: StyleProp<ViewStyle>;
  image: any;
  imageStyle?: StyleProp<ImageStyle>;
  shadowStyle?: StyleProp<ImageStyle>;
  noShadow?: boolean;
}) => (
  <View>
    <View style={style}>
      <Image source={image} style={[styles.icon, imageStyle]} />
    </View>
    {!noShadow ? <Image source={effectShadow} style={[styles.shadow, shadowStyle]} /> : null}
  </View>
);
