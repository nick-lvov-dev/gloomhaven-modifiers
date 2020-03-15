import React, { ReactNode, useState } from 'react';
import { View, UIManager, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import moment from 'moment';

interface Coords {
  x: number;
  y: number;
}

interface Props {
  onMove?: (evt: GestureResponderEvent) => void;
  onGrant?: (evt: GestureResponderEvent) => void;
  onRelease?: (evt: GestureResponderEvent, speed: number, size: Size) => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

interface Size {
  width: number;
  height: number;
}

interface MoveData {
  timestamp: number;
  coords: Coords;
}

const getSwipeSpeed = (moveData: MoveData, y: number) => (moveData.coords.y - y) / moment(moment.now()).diff(moveData.timestamp, 'ms');

const measureSpeedInterval = 100;

export default ({ children, onMove, onGrant, onRelease, style }: Props) => {
  const [elementSize, setElementSize] = useState<Size | null>(null); // determine if onPress is valid
  const [moveData, setMoveData] = useState<MoveData | null>(null); // measure swipe speed
  return (
    <View
      onStartShouldSetResponder={() => !moveData} // allow only one touch
      onResponderGrant={evt => {
        setMoveData({ timestamp: moment.now(), coords: { x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY } });
        UIManager.measure(evt.target, (x, y, width, height) => setElementSize({ width, height }));
        onGrant && onGrant(evt);
      }}
      onResponderMove={evt => {
        if (!moveData) return;
        const diff = moment(moveData.timestamp).diff(moment.now(), 'ms');
        if (diff > measureSpeedInterval) {
          setMoveData({ timestamp: moment.now(), coords: { x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY } });
        }

        onMove && onMove(evt);
      }}
      onResponderRelease={evt => {
        if (!moveData || !elementSize) return;
        onRelease && onRelease(evt, getSwipeSpeed(moveData, evt.nativeEvent.pageY), elementSize);
        setMoveData(null);
      }}
      style={style}>
      {children}
    </View>
  );
};
