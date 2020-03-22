import { StyleSheet } from 'react-native';
import { height } from 'src/core/Dimensions';
import { FontFamily } from 'src/core/FontFamily';
import { colors } from 'src/core/colors';

export default StyleSheet.create({
  value: {
    flex: 0,
    alignSelf: 'stretch',
  },
  option: {
    fontFamily: FontFamily.SemiBold,
  },
  optionsModal: { marginTop: height * 0.2, marginHorizontal: 0, paddingHorizontal: 0 },
  optionsWrapper: { backgroundColor: '#fff' },
  valueWrapper: { borderWidth: 1, borderRadius: 4, borderColor: colors.light, overflow: 'hidden' },
});
