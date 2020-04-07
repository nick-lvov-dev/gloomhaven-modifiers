import { StyleSheet } from 'react-native';
import { colors } from 'src/core/colors';

export default StyleSheet.create({
  dash: { height: 8, width: 1.5, backgroundColor: colors.light, opacity: 0.7, marginBottom: 2 },
  arrow: {
    position: 'absolute',
    left: '50%',
    top: -2,
    borderTopColor: colors.light,
    borderLeftColor: colors.light,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    opacity: 0.7,
    transform: [{ rotate: '45deg' }, { translateX: -9 }],
    width: 13,
    height: 13,
  },
  text: { color: colors.light, marginTop: 8 },
});
