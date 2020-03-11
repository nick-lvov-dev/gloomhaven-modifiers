import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    width: 40,
    height: 40,
    alignItems: 'flex-start',
  },
  checkbox: {
    borderBottomWidth: 4,
    borderRightWidth: 4,
    transform: [{ rotate: '36deg' }],
    borderColor: '#58f540',
    width: 14,
    height: 26,
    left: 11,
    top: 2
  },
});
