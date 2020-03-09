import React from 'react';
import { SvgProps, SvgXml } from 'react-native-svg';
import { mapSvgProps } from './helpers/mapSvgProps';
import { plus } from 'assets/images';

interface Props extends SvgProps {
  xml: string;
}
const Icon = ({ width, height, xml, ...rest }: Props) => <SvgXml xml={mapSvgProps({ width, height }, rest, xml)} />;

export default {
  Plus: (props: SvgProps) => <Icon {...props} xml={plus} />,
};
