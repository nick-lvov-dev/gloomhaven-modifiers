import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';

export default StyleSheet.create({
  container: {
    flex: 0,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  label: {
    fontFamily: FontFamily.SemiBold,
    paddingBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontFamily: FontFamily.SemiBold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontFamily: FontFamily.Regular,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
});
