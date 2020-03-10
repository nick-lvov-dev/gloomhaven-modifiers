import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from 'src/AppNavigator/models/RootStackParamsList';
import Loader from '../../components/Loader/Loader';
import { connect } from 'react-redux';
import { loadHeroes, removeHero, addHero } from 'src/store/heroes/heroes';
import { RootState } from 'src/store/store';
import { classes, HeroClass } from 'src/core/HeroClass';
import heroIcons from 'assets/images/classes/heroIcons';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import SelectModal from 'src/components/Select/SelectModal/SelectModal';
import { Monsters } from 'src/common/Monsters';
import { Hero } from 'src/core/Hero/Hero';
import { plus } from 'assets/images';

interface StateProps {
  heroes: HeroVm[];
  isLoading: boolean;
  heroesLoaded: boolean;
}

interface DispatchProps {
  loadHeroesData: () => void;
  remove: (hero: HeroVm) => void;
  add: (hero: Hero) => void;
}

interface OwnProps {
  navigation: StackNavigationProp<RootStackParamsList, 'Home'>;
}

type Props = OwnProps & StateProps & DispatchProps;

const HeroModalActions = {
  Edit: 'Edit',
  Delete: 'Delete',
};

const Home = ({ isLoading, heroes, navigation, loadHeroesData, remove, add, heroesLoaded }: Props) => {
  const [isHeroModalVisible, setIsHeroModalVisible] = useState(false);
  const [selectedHero, setSelectedHero] = useState<HeroVm | null>(null);

  const openHeroModal = (hero: HeroVm) => {
    setSelectedHero(hero);
    setIsHeroModalVisible(true);
  };
  const closeHeroModal = () => {
    setSelectedHero(null);
    setIsHeroModalVisible(false);
  };
  const onHeroModalAction = ({ name }: { name: keyof typeof HeroModalActions }) => {
    switch (name) {
      case HeroModalActions.Edit: {
        selectedHero && navigation.navigate('HeroEdit', { hero: selectedHero.name });
        closeHeroModal();
        break;
      }
      case HeroModalActions.Delete: {
        selectedHero && remove(selectedHero);
        closeHeroModal();
        break;
      }
    }
  };
  useEffect(() => {
    loadHeroesData();
  }, []);
  useEffect(() => {
    if (heroesLoaded && !heroes.find(x => x.heroClass === HeroClass.Monsters)) {
      add(Monsters);
    }
  }, [heroesLoaded]);
  return (
    <>
      <Loader active={isLoading} />
      <View style={styles.container}>
        {heroes
          .filter(x => x.heroClass !== HeroClass.Monsters)
          .map(hero => (
            <TouchableOpacity
              key={hero.name}
              onPress={() => navigation.navigate('HeroView', { hero: hero.name })}
              onLongPress={() => openHeroModal(hero)}>
              <View style={styles.heroItem}>
                <Text style={styles.heroItemText}>{hero.name}</Text>
                <View style={styles.heroItemIconWrapper}>
                  <Image source={classes.find(x => x.name === hero.heroClass)?.icon} style={styles.buttonIcon} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.addHeroButtonWrapper}>
        <TouchableHighlight
          underlayColor={'#ccc'}
          style={[styles.addHeroButton, { backgroundColor: '#fff', marginBottom: 16 }]}
          onPress={() => navigation.navigate('HeroView')}>
          <Image source={heroIcons.Monsters} style={styles.buttonIcon} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.addHeroButton} onPress={() => navigation.navigate('HeroEdit')}>
          <Image source={plus} style={styles.buttonIcon} />
        </TouchableHighlight>
      </View>
      <SelectModal
        isVisible={isHeroModalVisible}
        items={(Object.keys(HeroModalActions) as Array<keyof typeof HeroModalActions>).map(name => ({ name }))}
        onBackdropPress={closeHeroModal}
        onBackButtonPress={closeHeroModal}
        onSelect={onHeroModalAction}
      />
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(state => ({ ...state.heroes }), {
  loadHeroesData: loadHeroes,
  add: addHero,
  remove: removeHero,
})(Home);
