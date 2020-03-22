import React, { useEffect, useState, useMemo } from 'react';
import { View, Animated, TouchableWithoutFeedback, Image, StyleProp, ViewStyle } from 'react-native';
import styles from './styles';
import { check } from 'assets/images';
import { colors } from 'src/core/colors';

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
  checkColor?: string;
  animationDuration?: number;
}

export default ({ checked, onChange, size = 40, checkColor = colors.red, animationDuration = 300, style }: Props) => {
  const [animatedWidth] = useState(new Animated.Value(checked ? size : 0));
  const checkWidth = useMemo(() => (size / 4) * 3, [size]);
  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: checked ? size : 0,
      duration: animationDuration,
    }).start();
  }, [checked]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onChange(!checked);
      }}>
      <View style={[styles.container, { width: size, height: size, borderWidth: size / 20 }, style]}>
        <Animated.View style={[styles.animated, { width: animatedWidth, height: size }]}>
          <Image
            source={check}
            style={[styles.check, { tintColor: checkColor, width: checkWidth, height: size / 2, top: size / 4, left: size / 10 - 1 }]}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
