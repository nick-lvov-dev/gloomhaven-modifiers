import React, { ReactNode, useState } from 'react';
import styles from './styles';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';

export interface SelectProps<T> {
  value: T;
  bindValue?: keyof T;
  bindLabel?: keyof T | ((item: T) => string);
  items: T[];
  style?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<TextStyle>;
  onChange: (value: T) => void;
  renderItem?: (item: T) => ReactNode;
}

const getLabel = <T extends { [key: string]: object | string | number }>(value: T, bindLabel: keyof T | ((item: T) => string) = 'name') =>
  typeof bindLabel === 'function' ? bindLabel(value) : value[bindLabel].toString();

export default <T extends { [key: string]: object | string | number }>({
  value,
  bindLabel,
  items,
  style,
  valueStyle,
  itemStyle,
  renderItem,
  onChange,
}: SelectProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const openOptions = () => setIsVisible(true);
  const closeOptions = () => setIsVisible(false);
  return (
    <>
      <TouchableOpacity onPress={openOptions}>
        <View style={[styles.valueWrapper, style]}>
          {renderItem ? renderItem(value) : <Text style={[styles.value, valueStyle]}>{getLabel(value, bindLabel)}</Text>}
        </View>
      </TouchableOpacity>
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={100}
        isVisible={isVisible}
        onBackdropPress={closeOptions}
        onBackButtonPress={closeOptions}
        backdropTransitionOutTiming={0}>
        <View style={styles.optionsWrapper}>
          {items.map(item => (
            <TouchableOpacity
              key={getLabel(item, bindLabel)}
              onPress={() => {
                closeOptions();
                onChange(item);
              }}>
              {renderItem ? renderItem(item) : <Text style={[styles.option, itemStyle]}>{getLabel(item, bindLabel)}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
};
