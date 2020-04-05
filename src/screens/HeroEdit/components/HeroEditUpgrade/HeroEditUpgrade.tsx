import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { range } from 'src/common/helpers/range.helper';
import Checkbox from 'src/components/Checkbox/Checkbox';
import styles from './styles';
import 'react-native-get-random-values';
import { v4 as guid } from 'uuid';
import { ClassUpgrade } from 'src/core/ClassUpdgrades/models/ClassUpgrade';
import ModifierStats from './components/ModifierStats/ModifierStats';
import { numberToWord } from 'src/common/helpers/numberToWord.helper';

interface Props {
  upgrade: ClassUpgrade;
  checkedCount: number;
  onChange: (checked: boolean) => void;
}

export default ({ upgrade, checkedCount, onChange }: Props) => {
  const id = useRef(guid());
  return (
    <View style={styles.container}>
      <View style={styles.checkboxesWrapper}>
        {range(upgrade.limit).map(i => (
          <Checkbox
            style={styles.checkbox}
            size={30}
            key={'checkbox_' + id.current + '_' + i}
            checked={checkedCount >= i}
            onChange={onChange}
          />
        ))}
      </View>
      <View style={styles.contentWrapper}>
        {upgrade.subModifier ? (
          upgrade.modifier ? (
            <>
              <Text style={styles.text}>Replace {numberToWord(upgrade.count)}</Text>
              <ModifierStats modifier={upgrade.subModifier} />
              <Text style={styles.text}>with</Text>
              <ModifierStats modifier={upgrade.modifier} />
            </>
          ) : (
            <>
              <Text style={styles.text}>Remove {numberToWord(upgrade.count)}</Text>
              <ModifierStats modifier={upgrade.subModifier} />
            </>
          )
        ) : upgrade.modifier ? (
          <>
            <Text style={styles.text}>Add {numberToWord(upgrade.count)}</Text>
            <ModifierStats modifier={upgrade.modifier} />
          </>
        ) : null}
      </View>
    </View>
  );
};
