import React, { useRef } from 'react';
import { Text, View, StyleProp, ViewStyle } from 'react-native';
import styles from './styles';
import valueIcons from 'src/core/images/valueIcons';
import effectIcons from 'src/core/images/effectIcons';
import RoundIcon from 'src/components/RoundIcon/RoundIcon';
import { Modifier } from 'src/core/Modifiers/models/Modifier';
import { colors } from 'src/core/colors';
import SquareIcon from 'src/components/SquareIcon/SquareIcon';
import roundEffects from 'src/core/images/roundEffects';
import 'react-native-get-random-values';
import { v4 as guid } from 'uuid';
import { range } from 'src/common/helpers/range.helper';

export default ({
  modifier,
  color = colors.dark,
  style,
}: {
  modifier: Modifier | undefined;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  const id = useRef(guid());
  return modifier ? (
    <View style={[styles.container, style]}>
      {modifier.next ? <SquareIcon image={valueIcons.next} style={styles.iconWrapper} imageStyle={styles.icon} noShadow /> : null}
      {typeof modifier.attack === 'number' && range(3, -2).includes(modifier.attack) ? (
        <>
          <RoundIcon image={valueIcons[modifier.attack]} style={styles.iconWrapper} imageStyle={styles.icon} noShadow />
        </>
      ) : null}
      {modifier.heal ? (
        <>
          <RoundIcon image={valueIcons.heal} style={styles.iconWrapper} imageStyle={styles.icon} noShadow />
          <Text style={[styles.text, { color }]}>{`${modifier.heal > 0 ? '+' : ''}${modifier.heal.toString()}`}</Text>
        </>
      ) : null}
      {modifier.pierce ? (
        <>
          <SquareIcon image={valueIcons.pierce} style={styles.iconWrapper} imageStyle={styles.icon} noShadow />
          <Text style={[styles.text, { color }]}>{`${modifier.pierce > 0 ? '+' : ''}${modifier.pierce.toString()}`}</Text>
        </>
      ) : null}
      {modifier.targets ? (
        <>
          <SquareIcon image={valueIcons.target} style={styles.iconWrapper} imageStyle={styles.icon} noShadow />
          <Text style={[styles.text, { color }]}>{`${modifier.targets > 0 ? '+' : ''}${modifier.targets.toString()}`}</Text>
        </>
      ) : null}
      {modifier.effects
        ? modifier.effects.map(x =>
            roundEffects.includes(x) ? (
              <RoundIcon
                image={effectIcons[x]}
                style={styles.iconWrapper}
                imageStyle={styles.icon}
                key={`total_effect_icon_${id.current}_${x}`}
                noShadow
              />
            ) : (
              <SquareIcon
                image={effectIcons[x]}
                style={styles.iconWrapper}
                imageStyle={styles.icon}
                key={`total_effect_icon_${id.current}_${x}`}
                noShadow
              />
            )
          )
        : null}
    </View>
  ) : null;
};
