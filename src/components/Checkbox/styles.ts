import { StyleSheet } from 'react-native';
import { colors } from 'src/core/colors';

export default StyleSheet.create({
  container: {
    borderColor: colors.light,
    borderRadius: 4,
    alignItems: 'flex-start',
  },
  animated: { overflow: 'hidden' },
  check: { resizeMode: 'contain', top: 10 },
});
