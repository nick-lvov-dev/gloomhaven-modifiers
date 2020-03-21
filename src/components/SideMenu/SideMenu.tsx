import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { View, Animated, Dimensions, Easing, TouchableWithoutFeedback } from 'react-native';
import styles, { menuWidth } from './styles';
import { height, width } from 'src/core/Dimensions';
import { toast } from 'src/common/toast';

type Props = { isOpen: boolean; menu: ReactNode; animationDuration?: number; onChange: (isOpen: boolean) => void };
const bezier = Easing.bezier(0.25, 0.1, 0.25, 1);

export default ({ isOpen, menu, animationDuration = 200, onChange, children }: Props & Readonly<{ children?: ReactNode }>) => {
  const [animatedLeft] = useState(new Animated.Value(isOpen ? 0 : -menuWidth));
  const dragState = useRef(0);
  useEffect(() => {
    Animated.timing(animatedLeft, {
      toValue: isOpen ? 0 : -menuWidth,
      duration: animationDuration,
      easing: Easing.in(bezier),
    }).start();
  }, [isOpen]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.menu, { width: menuWidth, left: animatedLeft, zIndex: 2 }]}
        onStartShouldSetResponder={() => isOpen}
        onResponderTerminationRequest={() => false}
        onResponderGrant={({ nativeEvent: { pageX } }) => {
          dragState.current = pageX;
          animatedLeft.setOffset(menuWidth - pageX);
        }}
        onResponderMove={({ nativeEvent: { pageX } }) =>
          animatedLeft.setValue(pageX > dragState.current ? dragState.current - menuWidth : pageX - menuWidth)
        }
        onResponderRelease={({ nativeEvent: { pageX } }) => {
          if (dragState.current - pageX > menuWidth / 3) {
            animatedLeft.flattenOffset();
            onChange(false);
          } else {
            animatedLeft.flattenOffset();
            Animated.timing(animatedLeft, {
              toValue: 0,
              duration: animationDuration,
              easing: Easing.in(bezier),
            }).start();
          }

          dragState.current = 0;
        }}>
        {menu}
      </Animated.View>
      <TouchableWithoutFeedback disabled={!isOpen} onPress={() => onChange(false)}>
        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            width,
            height,
            backgroundColor: '#000000',
            opacity: animatedLeft.interpolate({ inputRange: [-menuWidth, 0], outputRange: [0, 0.2] }),
            zIndex: animatedLeft.interpolate({ inputRange: [-menuWidth, -menuWidth + 1, -menuWidth + 2], outputRange: [-1, 1, 1] }),
          }}
        />
      </TouchableWithoutFeedback>
      <View
        onStartShouldSetResponder={() => !isOpen}
        onResponderGrant={({ nativeEvent: { pageX } }) => {
          dragState.current = pageX;
          animatedLeft.setOffset(-pageX);
        }}
        onResponderMove={({ nativeEvent: { pageX } }) =>
          animatedLeft.setValue(pageX > menuWidth + dragState.current ? dragState.current : pageX - menuWidth)
        }
        onResponderRelease={({ nativeEvent: { pageX } }) => {
          if (pageX - dragState.current > menuWidth / 3) {
            animatedLeft.flattenOffset();
            onChange(true);
          } else {
            animatedLeft.flattenOffset();
            Animated.timing(animatedLeft, {
              toValue: -menuWidth,
              duration: animationDuration,
              easing: Easing.in(bezier),
            }).start();
          }

          dragState.current = 0;
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            width: 40,
            height,
            backgroundColor: '#00000001',
            zIndex: isOpen ? -1 : 1,
          }}></Animated.View>
      </View>
      {children}
    </View>
  );
};
