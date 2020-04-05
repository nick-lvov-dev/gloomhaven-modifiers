import React from 'react';
import { View, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { effectShadow } from 'assets/images';
import styles from './styles';

export default ({
  imageStyle,
  shadowStyle,
  style,
  image,
}: {
  tintColor?: string;
  style?: StyleProp<ViewStyle>;
  image: any;
  imageStyle?: StyleProp<ImageStyle>;
  shadowStyle?: StyleProp<ImageStyle>;
}) => (
  <View>
    <View style={style}>
      <Image source={image} style={[styles.icon, imageStyle]} />
    </View>
    <Image source={effectShadow} style={[styles.shadow, shadowStyle]} />
  </View>
);
