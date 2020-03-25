import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';
import { width } from 'src/core/Dimensions';
import { colors } from 'src/core/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    overflow: 'visible',
    backgroundColor: colors.background,
  },
  draw: {
    borderRadius: 32,
    height: 160,
    width: 240,
    marginVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  modifier: {
    borderRadius: 32,
    overflow: 'hidden',
    width: 240,
    height: 160,
  },
  drawnModifierWrapper: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteWrapper: { position: 'absolute', top: 16, right: 16 },
  delete: { height: 24, width: 24, resizeMode: 'contain', tintColor: colors.dark },
  remaining: { fontFamily: FontFamily.SemiBold, fontSize: 14, textAlign: 'center', marginBottom: 24 },
  shuffleWrapper: { position: 'absolute', right: 32, top: -10, backgroundColor: colors.dark, padding: 8, paddingLeft: 9, paddingRight: 7, borderRadius: 20 },
  shuffle: { width: 24, height: 24, resizeMode: 'contain' },
  total: {
    color: '#000',
    fontFamily: FontFamily.SemiBold,
    fontSize: 18,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  blessCurseContainer: {
    position: 'absolute',
    bottom: 40,
    height: 96,
    flexDirection: 'row',
    width: width - 32,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginHorizontal: 16,
  },
  blessCurseWrapper: { justifyContent: 'center' },
  blessCurseImage: { width: 70, height: 46, marginBottom: 16, resizeMode: 'contain' },
  blessCurseCount: { textAlign: 'center', fontSize: 18 },
  deckContainer: { alignItems: 'center' }
});
