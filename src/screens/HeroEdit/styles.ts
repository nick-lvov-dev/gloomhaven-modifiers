import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';
import { colors } from 'src/core/colors';

const heroIconDimension = 56;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  scroll: { padding: 32, flexGrow: 1, justifyContent: 'space-between' },
  topContentWrapper: { alignItems: 'center' },
  heroIconWrapper: { padding: 16, backgroundColor: colors.dark, borderRadius: 100, marginBottom: 24 },
  heroIcon: {
    width: heroIconDimension,
    height: heroIconDimension,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  upgrades: { textAlign: 'center', fontSize: 16, fontFamily: FontFamily.SemiBold, paddingVertical: 16 },
  button: {
    fontFamily: FontFamily.Bold,
    fontSize: 16,
    marginTop: 24,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.red,
    color: '#fff',
    textAlign: 'center',
  },
  cancel: {
    fontFamily: FontFamily.Bold,
    marginTop: 24,
    fontSize: 16,
    color: colors.dark,
    textAlign: 'center',
  },
});
