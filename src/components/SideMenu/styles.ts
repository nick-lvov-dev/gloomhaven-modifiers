import { StyleSheet } from 'react-native';
import { height } from 'src/core/Dimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    top: 0,
    height,
  },
});
