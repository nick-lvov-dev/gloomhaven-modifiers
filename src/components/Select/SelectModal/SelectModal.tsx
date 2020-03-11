import React, { ReactNode } from 'react';
import Modal from 'react-native-modal';
import { View, TouchableOpacity, StyleProp, ViewStyle, TextStyle, Text } from 'react-native';
import styles from './styles';
import getLabel from '../helpers/getLabel';

export interface SelectModalProps<T> {
  isVisible: boolean;
  bindLabel?: keyof T | ((item: T) => string);
  items: T[];
  itemStyle?: StyleProp<TextStyle>;
  onBackdropPress: () => void;
  onBackButtonPress?: () => void;
  onSelect: (item: T) => void;
  renderItem?: (item: T) => ReactNode;
}

export default <T extends any>({
  isVisible,
  onBackdropPress,
  onBackButtonPress,
  items,
  bindLabel = 'name',
  onSelect,
  renderItem,
  itemStyle,
}: SelectModalProps<T>) => (
  <Modal
    animationIn="fadeIn"
    animationOut="fadeOut"
    animationInTiming={100}
    animationOutTiming={100}
    isVisible={isVisible}
    onBackdropPress={onBackdropPress}
    onBackButtonPress={onBackButtonPress}
    backdropTransitionOutTiming={0}>
    <View style={styles.optionsWrapper}>
      {items.map(item => (
        <TouchableOpacity
          key={getLabel(item, bindLabel)}
          onPress={() => {
            onSelect(item);
          }}>
          {renderItem ? renderItem(item) : <Text style={[styles.option, itemStyle]}>{getLabel(item, bindLabel)}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  </Modal>
);
