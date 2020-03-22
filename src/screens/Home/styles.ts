import { StyleSheet } from 'react-native';
import { colors } from 'src/core/colors';

export default StyleSheet.create({
  container: { flex: 1, alignItems: 'stretch' },
  sceneContainer: { flex: 1 },
  tabBar: { backgroundColor: colors.dark },
  tabIndicator: { backgroundColor: colors.red }
});
