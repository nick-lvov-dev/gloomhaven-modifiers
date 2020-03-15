import { StyleSheet } from 'react-native';
import { modifierHeight } from './components/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  draw: {
    borderRadius: 32,
    height: modifierHeight,
    width: 240,
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
});
