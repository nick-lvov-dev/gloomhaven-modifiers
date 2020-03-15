import React, { ReactNode, useState, useEffect } from 'react';
import { View, Animated, Dimensions, Easing, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { height } from 'src/core/Dimensions';

type Props = { isOpen: boolean; menu: ReactNode; animationDuration?: number; onChange: (isOpen: boolean) => void };
const menuWidth = (Math.round(Dimensions.get('window').width) * 2) / 3;
const bezier = Easing.bezier(0.25, 0.1, 0.25, 1);

export default ({ isOpen, menu, animationDuration = 200, onChange, children }: Props & Readonly<{ children?: ReactNode }>) => {
  const [animatedLeft] = useState(new Animated.Value(isOpen ? 0 : -menuWidth));
  useEffect(() => {
    Animated.timing(animatedLeft, {
      toValue: isOpen ? 0 : -menuWidth,
      duration: animationDuration,
      easing: Easing.in(bezier),
    }).start();
  }, [isOpen]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menu, { width: menuWidth, left: animatedLeft, zIndex: 2 }]}>{menu}</Animated.View>
      <TouchableWithoutFeedback disabled={!isOpen} onPress={() => onChange(false)}>
        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            width: menuWidth / 2 + 100,
            height,
            backgroundColor: '#000000',
            opacity: animatedLeft.interpolate({ inputRange: [-menuWidth, 0], outputRange: [0, 0.2] }),
            zIndex: animatedLeft.interpolate({ inputRange: [-menuWidth, 0], outputRange: [-1, 1] }),
          }}
        />
      </TouchableWithoutFeedback>
      {children}
    </View>
  );
};
