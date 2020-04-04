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
    alignSelf: 'flex-start',
    transform: [{ rotate: '45deg' }],
  },
  shuffle: { transform: [{ rotateY: '180deg' }] },
  actions: { position: 'absolute', right: 0, top: 0, padding: 16, alignItems: 'center' },
  modifiers: { position: 'absolute', left: 0, top: 0, padding: 16, alignItems: 'stretch' },
  action: { marginBottom: 24, justifyContent: 'center', alignSelf: 'flex-start' },
  modifier: { marginBottom: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 70 },
  actionShadow: { position: 'absolute', top: 2, width: 42, height: 42, resizeMode: 'contain', zIndex: -1, tintColor: '#000000aa' },
  modifierAction: { width: 40, height: 40, resizeMode: 'contain' },
  modifierActionText: { fontFamily: FontFamily.Pirata, fontSize: 32, color: colors.dark },
  advantageDisadvantage: { width: 60, height: 60, resizeMode: 'contain' },
  advantageDisadvantageWrapper: { position: 'absolute', left: 16, top: '50%', transform: [{ translateY: -30 }] },
  total: {
    color: '#000',
    fontFamily: FontFamily.SemiBold,
    fontSize: 18,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  deckContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
