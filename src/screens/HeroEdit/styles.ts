import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';

const heroIconDimension = 24;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 32,
  },
  heroIcon: {
    position: 'absolute',
    right: 16,
    width: heroIconDimension,
    height: heroIconDimension,
  },
  heroItem: {
    flex: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  button: {
    fontFamily: FontFamily.Bold,
    fontSize: 16,
    marginTop: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#666',
    color: '#fff',
    textAlign: 'center',
  },
});
