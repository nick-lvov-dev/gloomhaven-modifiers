import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';

export default StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  text: {
    fontFamily: FontFamily.Pirata,
    fontSize: 24,
    marginRight: 8,
    paddingBottom: 8,
  },
  icon: {
    marginRight: 4,
    marginBottom: 8,
  },
});
