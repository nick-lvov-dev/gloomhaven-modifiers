import React, { ComponentProps } from 'react';
import FormField from './FormField';
import Select, { SelectProps } from '../Select/Select';

type Props<T extends { [key: string]: object | string | number }> = ComponentProps<typeof FormField> & SelectProps<T>;

export default <T extends { [key: string]: object | string | number }>({ label, ...rest }: Props<T>) => (
  <FormField label={label}>
    <Select {...rest} />
  </FormField>
);
