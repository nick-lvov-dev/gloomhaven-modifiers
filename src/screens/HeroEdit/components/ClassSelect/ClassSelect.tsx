import React, { useMemo } from 'react';
import Modal from 'react-native-modal';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { ClassVm, classes, HeroClass } from 'src/core/HeroClass';
import { connect } from 'react-redux';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { RootState } from 'src/store/store';
import { activeOpacity } from 'src/core/contstants';

interface StateProps {
  heroes: HeroVm[];
}

interface OwnProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  onBackButtonPress?: () => void;
  onSelect: (c: ClassVm) => void;
}

type Props = OwnProps & StateProps;

export default connect<StateProps, {}, OwnProps, RootState>(state => ({ heroes: state.heroes.heroes }))(
  ({ isVisible, onBackdropPress, onBackButtonPress, onSelect, heroes }: Props) => {
    const availableClasses = useMemo(
      () => classes.filter(heroClass => heroClass.name !== HeroClass.Monsters && !heroes.some(hero => hero.heroClass === heroClass.name)),
      [heroes]
    );
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={100}
        animationOutTiming={100}
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        onBackButtonPress={onBackButtonPress}
        backdropTransitionOutTiming={0}
        backdropOpacity={0.9}>
        <View style={styles.container}>
          {availableClasses.map(c => (
            <TouchableOpacity
              key={`hero_select_class_${c.id}`}
              style={styles.classWrapper}
              activeOpacity={activeOpacity}
              onPress={() => onSelect(c)}>
              <Image source={c.icon} style={styles.classIcon} />
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    );
  }
);
