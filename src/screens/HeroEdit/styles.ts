import { StyleSheet } from 'react-native';
import { FontFamily } from 'src/core/FontFamily';

const heroIconDimension = 24;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  heroIcon: {
    position: 'absolute',
    right: 16,
    width: heroIconDimension,
    height: heroIconDimension,
  },
  heroValue: {
    flex: 0,
    padding: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heroValueText: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 14,
  },
  heroItem: {
    flex: 0,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heroItemText: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 18,
    letterSpacing: 0.3,
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
