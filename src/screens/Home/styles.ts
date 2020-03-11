import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';

const buttonDimension = 40;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 32,
  },
  addHeroButtonWrapper: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  button: {
    backgroundColor: '#666',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 5,
  },
  heroItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  heroItemText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FontFamily.SemiBold,
  },
  heroItemIconWrapper: {
    position: 'absolute',
    right: 16,
    top: 8,
  },
  heroItemIcon: {
    width: 24,
    height: 24,
  },
  buttonIcon: {
    height: buttonDimension,
    width: buttonDimension,
    resizeMode: 'contain'
  },
});
