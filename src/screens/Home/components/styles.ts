import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#666',
  },
  title: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#333',
    textAlign: 'center',
    height: 48,
    textAlignVertical: 'center',
  },
  hero: { fontFamily: FontFamily.Regular, fontSize: 16, color: '#fff', paddingVertical: 16, textAlign: 'center' },
  addHeroWrapper: { alignSelf: 'center', flexDirection: 'row', alignItems: 'center', paddingVertical: 16 },
  addHero: { fontFamily: FontFamily.Regular, fontSize: 14, color: '#ddd' },
  addHeroIcon: { height: 12, width: 12, marginLeft: 16 },
});
