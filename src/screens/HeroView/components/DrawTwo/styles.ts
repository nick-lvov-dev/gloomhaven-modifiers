import { StyleSheet } from 'react-native';
import { width, height } from 'src/core/Dimensions';

export default StyleSheet.create({
  modal: { width, height, margin: 0 },
  container: { flex: 1, margin: 32, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  result: { alignItems: 'center' },
  resultTotal: { flexWrap: 'wrap', flex: 1 },
  totalWrapper: { flexGrow: 0, flexShrink: 0, flexDirection: 'row', margin: 32, marginBottom: 0 },
  modifier: { marginBottom: 8 },
});
