import React, { useEffect, useState } from 'react';
import { View, Animated, TouchableWithoutFeedback, StyleProp, ViewStyle } from 'react-native';
import styles from './styles';

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
          <View style={styles.checkbox} />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
