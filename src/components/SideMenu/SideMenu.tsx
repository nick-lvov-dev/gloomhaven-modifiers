import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { View, Animated, Easing, TouchableWithoutFeedback, EasingFunction } from 'react-native';
import styles, { menuWidth } from './styles';

type Props = {
  isOpen: boolean;
  menu: ReactNode;
  animationDuration?: number;
  onChange: (isOpen: boolean) => void;
  animationFunc?: EasingFunction;
  anchorWidth?: number;
  anchorColor?: string;
  backdropColor?: string;
  backdropOpacity?: number;
  dragActionLength?: number;
} & Readonly<{ children?: ReactNode }>;
const bezier = Easing.bezier(0.25, 0.1, 0.25, 1);

export default ({
  isOpen,
  menu,
  animationDuration = 200,
  anchorWidth = 40,
  anchorColor = '#00000001',
  onChange,
  animationFunc = bezier,
  backdropColor = '#000',
  backdropOpacity = 0.2,
  dragActionLength = menuWidth / 3,
  children,
}: Props) => {
  const [animatedLeft] = useState(new Animated.Value(isOpen ? 0 : -menuWidth));
  const dragState = useRef(0);
  useEffect(() => {
    Animated.timing(animatedLeft, {
      toValue: isOpen ? 0 : -menuWidth,
      duration: animationDuration,
      easing: Easing.in(animationFunc),
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
          if (dragState.current - pageX > dragActionLength) {
            animatedLeft.flattenOffset();
            onChange(false);
          } else {
            animatedLeft.flattenOffset();
            Animated.timing(animatedLeft, {
              toValue: 0,
              duration: animationDuration,
              easing: Easing.in(animationFunc),
            }).start();
          }

          dragState.current = 0;
        }}>
        {menu}
      </Animated.View>
      <TouchableWithoutFeedback disabled={!isOpen} onPress={() => onChange(false)}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              backgroundColor: backdropColor,
              opacity: animatedLeft.interpolate({ inputRange: [-menuWidth, 0], outputRange: [0, backdropOpacity] }),
              zIndex: animatedLeft.interpolate({ inputRange: [-menuWidth, -menuWidth + 1, -menuWidth + 2], outputRange: [-1, 1, 1] }),
            },
          ]}
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
          if (pageX - dragState.current > dragActionLength) {
            animatedLeft.flattenOffset();
            onChange(true);
          } else {
            animatedLeft.flattenOffset();
            Animated.timing(animatedLeft, {
              toValue: -menuWidth,
              duration: animationDuration,
              easing: Easing.in(animationFunc),
            }).start();
          }

          dragState.current = 0;
        }}>
        <Animated.View
          style={[
            styles.anchor,
            {
              width: anchorWidth,
              backgroundColor: anchorColor,
              zIndex: isOpen ? -1 : 1,
            },
          ]}></Animated.View>
      </View>
      {children}
    </View>
  );
};
