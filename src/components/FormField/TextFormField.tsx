import React, { ComponentProps } from 'react';
import { TextInput } from 'react-native';
import styles from './styles';
import FormField from './FormField';

interface Props extends ComponentProps<typeof FormField> {
  value: string;
  onChange: (value: string) => void;
}

export default ({ value, onChange, ...rest }: Props) => (
  <FormField {...rest}>
    <TextInput style={styles.input} value={value} onChangeText={onChange} />
  </FormField>
);
