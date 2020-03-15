import Toast from 'react-native-root-toast';

export const toast = (text?: string, position = Toast.positions.BOTTOM, duration = 1000) =>
  Toast.show(text || 'NULL', { position, duration });
