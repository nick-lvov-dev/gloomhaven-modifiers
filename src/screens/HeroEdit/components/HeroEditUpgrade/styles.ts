import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';

export default StyleSheet.create({
  container: { flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', marginBottom: 16 },
  checkboxesWrapper: { flexDirection: 'row' },
  checkbox: { marginRight: 8 },
  text: { fontFamily: FontFamily.Regular, fontSize: 16 },
  contentWrapper: { flexDirection: 'row', alignItems: 'center' },
});
