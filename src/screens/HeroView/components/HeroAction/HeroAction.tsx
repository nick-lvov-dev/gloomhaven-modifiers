import React, { ComponentProps } from 'react';
import { activeOpacity } from 'src/core/contstants';
import { TouchableOpacity } from 'react-native';
import RoundIcon from 'src/components/RoundIcon/RoundIcon';

export default ({ onPress, ...rest }: ComponentProps<typeof RoundIcon> & { onPress: () => void }) => (
  <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
    <RoundIcon {...rest} withBackground />
  </TouchableOpacity>
);
