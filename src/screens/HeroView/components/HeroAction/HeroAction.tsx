import React from 'react';
import { activeOpacity } from 'src/core/contstants';
import { View, TouchableOpacity, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { roundShadow } from 'assets/images';
import styles from './styles';

export default ({
  imageStyle,
  shadowStyle,
  style,
  image,
  onPress,
}: {
  tintColor?: string;
  style?: StyleProp<ViewStyle>;
  image: any;
  imageStyle?: StyleProp<ImageStyle>;
  shadowStyle?: StyleProp<ImageStyle>;
  onPress: () => void;
}) => (
  <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
    <View style={[styles.container, style]}>
      <Image source={image} style={[styles.icon, imageStyle]} />
    </View>
    <Image source={roundShadow} style={[styles.actionShadow, shadowStyle]} />
  </TouchableOpacity>
);
