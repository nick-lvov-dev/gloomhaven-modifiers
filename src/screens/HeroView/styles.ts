import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';
import { colors } from 'src/core/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    overflow: 'visible',
    backgroundColor: colors.background,
  },
  heroAction: { padding: 8, borderRadius: 20, backgroundColor: colors.darker },
  deleteWrapper: { backgroundColor: colors.red },
  delete: { height: 24, width: 24, resizeMode: 'contain', transform: [{ rotate: '45deg' }] },
  edit: { height: 24, width: 24, resizeMode: 'contain' },
  shuffleWrapper: {
    backgroundColor: colors.darker,
    padding: 8,
    paddingLeft: 9,
    paddingRight: 7,
    borderRadius: 100,
    marginBottom: 8
  },
  actions: { position: 'absolute', right: 0, top: 0, padding: 16, alignItems: 'center' },
  modifiers: { position: 'absolute', left: 0, top: 0, padding: 16, alignItems: 'stretch' },
  action: { marginBottom: 24, justifyContent: 'center', alignSelf: 'flex-start' },
  modifier: { marginBottom: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 70 },
  actionShadow: { position: 'absolute', top: 2, width: 42, height: 42, resizeMode: 'contain', zIndex: -1, tintColor: '#000000aa' },
  modifierAction: { width: 40, height: 40, resizeMode: 'contain' },
  modifierActionText: { fontFamily: FontFamily.Pirata, fontSize: 32, color: colors.dark },
  advantageDisadvantage: { width: 60, height: 55, resizeMode: 'contain' },
  shuffle: { width: 24, height: 24, resizeMode: 'contain' },
  total: {
    color: '#000',
    fontFamily: FontFamily.SemiBold,
    fontSize: 18,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  deckContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
});
