import { StyleSheet } from 'react-native';
import { height, width } from 'src/core/Dimensions';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    height: height,
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000055',
  },
});
