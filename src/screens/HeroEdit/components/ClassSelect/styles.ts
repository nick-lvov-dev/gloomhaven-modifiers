import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', flex: 1, justifyContent: 'space-between', padding: 32 },
  classIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  classWrapper: {
    padding: 8,
    borderRadius: 28,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 32
  },
});
