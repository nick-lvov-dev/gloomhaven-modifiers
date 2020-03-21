import { StyleSheet } from 'react-native';
import { width } from 'src/core/Dimensions';

const modifierWidth = width / 2;
const modifierHeight = (modifierWidth / 3) * 2;
const modifierBorderRadius = modifierHeight / 10;

export default StyleSheet.create({
  modifier: {
    borderRadius: modifierBorderRadius,
    width: modifierWidth,
    height: modifierHeight,
  },
  shadow: {
    position: 'absolute',
    top: 2,
    left: 2,
    zIndex: -1,
  },
});
