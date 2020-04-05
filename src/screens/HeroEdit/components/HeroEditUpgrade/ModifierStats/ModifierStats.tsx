import React, { useRef } from 'react';
import { Text, View, StyleProp, ViewStyle } from 'react-native';
import styles from './styles';
import { colors } from 'src/core/colors';
import { Modifier } from 'src/core/Modifiers/models/Modifier';
import { range } from 'lodash';
import RoundIcon from 'src/components/RoundIcon/RoundIcon';
import valueIcons from 'src/core/images/valueIcons';
import SquareIcon from 'src/components/SquareIcon/SquareIcon';
import roundEffects from 'src/core/images/roundEffects';
import effectIcons from 'src/core/images/effectIcons';
import 'react-native-get-random-values';
import { v4 as guid } from 'uuid';

export default ({ total, color = colors.dark, style }: { total: Modifier | undefined; color?: string; style?: StyleProp<ViewStyle> }) => {
  const id = useRef(guid());
  return total ? (
    <View style={[styles.container, style]}>
      {typeof total.attack === 'number' && range(3, -2).includes(total.attack) ? (
        <>
          <RoundIcon image={valueIcons[total.attack]} style={styles.icon} noShadow />
        </>
      ) : null}
      {total.heal ? (
        <>
          <RoundIcon image={valueIcons.heal} style={styles.icon} noShadow />
          <Text style={[styles.text, { color }]}>{`${total.heal > 0 ? '+' : ''}${total.heal.toString()}`}</Text>
        </>
      ) : null}
      {total.pierce ? (
        <>
          <SquareIcon image={valueIcons.pierce} style={styles.icon} />
          <Text style={[styles.text, { color }]}>{`${total.pierce > 0 ? '+' : ''}${total.pierce.toString()}`}</Text>
        </>
      ) : null}
      {total.targets ? (
        <>
          <SquareIcon image={valueIcons.target} style={styles.icon} />
          <Text style={[styles.text, { color }]}>{`${total.targets > 0 ? '+' : ''}${total.targets.toString()}`}</Text>
        </>
      ) : null}
      {total.effects
        ? total.effects.map(x =>
            roundEffects.includes(x) ? (
              <RoundIcon image={effectIcons[x]} style={styles.icon} key={`modifier_effect_icon_${id.current}_${x}`} />
            ) : (
              <SquareIcon image={effectIcons[x]} style={styles.icon} key={`modifier_effect_icon_${id.current}_${x}`} />
            )
          )
        : null}
    </View>
  ) : null;
};
