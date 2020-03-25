import { StyleSheet } from 'react-native';
import { getModifierStyle } from '../ModifierView/ModifierView';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  draw: {
    ...getModifierStyle(),
    marginVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
  staticModifier: { position: 'absolute' },
  historyShadow: {
    position: 'absolute',
    left: 2,
  },
});
