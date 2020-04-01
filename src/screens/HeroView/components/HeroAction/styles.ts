import { StyleSheet } from 'react-native';
import { colors } from 'src/core/colors';

export default StyleSheet.create({
  container: { padding: 8, borderRadius: 20, backgroundColor: colors.darker },
  icon: { height: 24, width: 24, resizeMode: 'contain' },
  deleteWrapper: { backgroundColor: colors.red },
  actionShadow: { position: 'absolute', top: 2, width: 42, height: 42, resizeMode: 'contain', zIndex: -1, tintColor: '#000000aa' },
});
