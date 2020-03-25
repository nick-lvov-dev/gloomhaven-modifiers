import { StyleSheet } from 'react-native';
import { getModifierStyle } from '../ModifierView/ModifierView';
import { width, height } from 'src/core/Dimensions';

export default StyleSheet.create({
  modal: { width, height, margin: 0 },
  container: { backgroundColor: '#0000', flex: 1, margin: 32, flexDirection: 'row', justifyContent: 'space-between' },
  result: { flex: 1, alignItems: 'center' },
  resultTotal: { color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 16 },
  modifier: { marginBottom: 8 },
});
