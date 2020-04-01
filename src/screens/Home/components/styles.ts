import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';
import { colors } from 'src/core/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: colors.darker,
  },
  title: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 20,
    color: '#fff',
    backgroundColor: colors.dark,
    textAlign: 'center',
    minHeight: 56,
    textAlignVertical: 'center',
  },
  hero: { fontFamily: FontFamily.Regular, fontSize: 16, color: '#fff', paddingVertical: 16, textAlign: 'center' },
  addHeroWrapper: { alignSelf: 'center', flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  addHero: { fontFamily: FontFamily.Regular, fontSize: 14, color: colors.light },
  addHeroIcon: { height: 12, width: 12, marginLeft: 16 },
});
