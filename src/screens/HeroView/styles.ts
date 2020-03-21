import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    overflow: 'visible',
    backgroundColor: '#f8f8f8',
    // backgroundColor: '#f00'
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
});
