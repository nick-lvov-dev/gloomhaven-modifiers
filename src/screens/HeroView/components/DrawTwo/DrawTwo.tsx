import React, { useEffect, useState, useMemo } from 'react';
import Modal from 'react-native-modal';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { width } from 'src/core/Dimensions';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { mapVmToHero } from 'src/store/heroes/models/helpers/mapVmToHero.helper';
import ModifierView from '../ModifierView/ModifierView';
import { Hero, DrawResult } from 'src/core/Hero/Hero';
import styles from './styles';

interface Props {
  hero: HeroVm;
  visible: boolean;
  onClose: (hero: Hero) => void;
}

export default ({ hero: heroVm, visible, onClose }: Props) => {
  const hero = useMemo(() => mapVmToHero(heroVm), [heroVm]);
  const [drawTwoResult, setDrawTwoResult] = useState<DrawResult[]>([]);
  useEffect(() => {
    if (visible) setDrawTwoResult(hero.drawTwo());
  }, [visible]);
  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={100}
      animationOutTiming={100}
      onBackdropPress={() => onClose(hero)}
      onBackButtonPress={() => onClose(hero)}
      backdropTransitionOutTiming={0}
      backdropOpacity={0.9}
      style={styles.modal}>
      <TouchableWithoutFeedback onPress={() => onClose(hero)}>
        <View style={styles.container}>
          {drawTwoResult.map((result, index) => (
            <View style={styles.result} key={`drawTwoResult_${index}`}>
              <Text style={styles.resultTotal}>{result.total}</Text>
              {result.drawn.map((modifier, i) => (
                <ModifierView key={`drawTwoDrawn_${index}_${i}`} modifier={modifier} width={width / 2 - 48} style={styles.modifier} />
              ))}
            </View>
          ))}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
