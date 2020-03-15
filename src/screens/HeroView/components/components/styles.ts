import { StyleSheet } from 'react-native';

export const modifierHeight = 160;

export default StyleSheet.create({
  modifier: {
    borderRadius: 16,
    width: 240,
    height: modifierHeight,
  },
  shadow: {
    position: 'absolute',
    top: 2,
    left: 2,
    zIndex: -1,
  },
});
