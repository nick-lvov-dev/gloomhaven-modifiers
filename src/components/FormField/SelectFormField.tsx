import React, { ComponentProps } from 'react';
import FormField from './FormField';
import Select, { SelectProps } from '../Select/Select';

type Props<T extends any> = ComponentProps<typeof FormField> & SelectProps<T>;

export default <T extends any>({ label, ...rest }: Props<T>) => (
  <FormField label={label}>
    <Select {...rest} />
  </FormField>
);
