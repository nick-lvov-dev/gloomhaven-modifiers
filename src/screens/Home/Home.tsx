import React, { useEffect } from 'react';
import { View, Image, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from 'src/AppNavigator/models/RootStackParamsList';
import { plus } from 'assets/images';
import Loader from '../../components/Loader/Loader';
import { connect } from 'react-redux';
import { loadHeroes } from 'src/store/heroes/heroes';
import { RootState } from 'src/store/store';
import { classes } from 'src/core/HeroClass';
import heroIcons from 'assets/images/classes/heroIcons';
import { HeroVm } from 'src/store/heroes/models/HeroVm';

interface StateProps {
  heroes: HeroVm[];
  isLoading: boolean;
}

interface DispatchProps {
  loadHeroesData: () => void;
}

interface OwnProps {
  navigation: StackNavigationProp<RootStackParamsList, 'Home'>;
}

type Props = OwnProps & StateProps & DispatchProps;

const Home = ({ isLoading, heroes, navigation, loadHeroesData }: Props) => {
  useEffect(() => {
    loadHeroesData();
  }, []);
  return (
    <>
      <Loader active={isLoading} />
      <View style={styles.container}>
        {heroes.map(hero => (
          <TouchableOpacity key={hero.name} onPress={() => navigation.navigate('HeroView', { hero: hero.name })}>
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
          style={[styles.addHeroButton, { backgroundColor: '#ffffff00', borderWidth: 1, borderColor: '#000', marginBottom: 16 }]}
          onPress={() => navigation.navigate('HeroView')}>
          <Image source={heroIcons.Monsters} style={styles.buttonIcon} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.addHeroButton} onPress={() => navigation.navigate('HeroEdit')}>
          <Image source={plus} style={styles.buttonIcon} />
        </TouchableHighlight>
      </View>
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(state => ({ ...state.heroes }), { loadHeroesData: loadHeroes })(
  Home
);
