import React, { useEffect, useState } from 'react';
import { View, Animated, TouchableWithoutFeedback, StyleProp, ViewStyle, Image } from 'react-native';
import styles from './styles';
import { check } from 'assets/images';
import { colors } from 'src/core/colors';

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export default ({ checked, onChange, style }: Props) => {
  const [widthAnimChecked] = useState(new Animated.Value(0));
  const [widthAnimUnchecked] = useState(new Animated.Value(0));
  useEffect(() => {
    if (checked) {
      Animated.timing(widthAnimChecked, {
        toValue: 40,
        duration: 300,
      }).start();
    } else {
      Animated.timing(widthAnimUnchecked, {
        toValue: 0,
        duration: 300,
      }).start();
    }
  }, [checked]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        checked ? widthAnimUnchecked.setValue(40) : widthAnimChecked.setValue(0);
        onChange(!checked);
      }}>
      <View style={[styles.container, style]}>
        <Animated.View style={{ height: 40, overflow: 'hidden', width: checked ? widthAnimChecked : widthAnimUnchecked }}>
          <Image source={check} style={{ width: 30, height: 20, resizeMode: 'contain', top: 10, left: 3, tintColor: colors.red }} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
