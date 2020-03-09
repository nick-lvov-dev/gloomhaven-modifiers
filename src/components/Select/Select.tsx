import React, { ReactNode, useState } from 'react';
import styles from './styles';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import getLabel from './helpers/getLabel';
import SelectModal from './SelectModal/SelectModal';

export interface SelectProps<T> {
  value: T;
  bindLabel?: keyof T | ((item: T) => string);
  style?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<TextStyle>;
  onChange: (value: T) => void;
  renderValue?: (item: T) => ReactNode;
  renderItem?: (item: T) => ReactNode;
  items: T[];
}

export default <T extends any>({ value, bindLabel, style, valueStyle, renderValue, onChange, ...rest }: SelectProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const openOptions = () => setIsVisible(true);
  const closeOptions = () => setIsVisible(false);
  return (
    <>
      <TouchableOpacity onPress={openOptions}>
        <View style={[styles.valueWrapper, style]}>
          {renderValue ? renderValue(value) : <Text style={[styles.value, valueStyle]}>{getLabel(value, bindLabel)}</Text>}
        </View>
      </TouchableOpacity>
      <SelectModal
        isVisible={isVisible}
        onBackButtonPress={closeOptions}
        onBackdropPress={closeOptions}
        bindLabel={bindLabel}
        onSelect={item => {
          closeOptions();
          onChange(item);
        }}
        {...rest}
      />
    </>
  );
};
