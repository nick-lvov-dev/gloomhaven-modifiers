import { StyleSheet } from 'react-native';
import { colors } from 'src/core/colors';

export default StyleSheet.create({
  container: { flex: 1, alignItems: 'stretch' },
  sceneContainer: { flex: 1 },
  tabBar: { backgroundColor: colors.dark, maxHeight: 56 },
  tabIndicator: { backgroundColor: colors.red },
  addHeroLabel: { fontSize: 10, marginTop: 4, letterSpacing: 0.2, textAlign: 'center' },
  addHeroIcon: { width: 16, height: 16, resizeMode: 'contain', tintColor: '#fff' },
  heroIcon: { width: 32, height: 32, resizeMode: 'contain', tintColor: '#fff' },
});
