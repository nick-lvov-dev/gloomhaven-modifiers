import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';

const addButtonDimension = 40;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 16,
  },
  addHeroButtonWrapper: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  addHeroButton: {
    backgroundColor: '#ccc',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  heroItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
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
    width: addButtonDimension,
    height: addButtonDimension,
  },
});
