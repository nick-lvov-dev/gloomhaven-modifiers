import { StyleSheet } from 'react-native';
import { height, width } from 'src/core/Dimensions';

export const menuWidth = (Math.round(width) * 2) / 3;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    top: 0,
    height,
    zIndex: 2,

  },
});
