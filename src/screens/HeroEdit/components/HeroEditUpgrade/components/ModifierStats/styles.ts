import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';

export default StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 4 },
  text: {
    fontFamily: FontFamily.Pirata,
    fontSize: 20,
    marginRight: 8,
  },
  iconWrapper: {
    marginRight: 4,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
