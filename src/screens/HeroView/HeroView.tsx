import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from 'src/AppNavigator/models/RootStackParamsList';
import { RouteProp } from '@react-navigation/native';
import { updateHero } from 'src/store/heroes/heroes';
import { connect } from 'react-redux';
import { RootState } from 'src/store/store';
import { FontFamily } from 'src/core/FontFamily';
import { Monsters } from 'src/common/Monsters';
import { reload } from 'assets/images';
import { width } from 'src/core/Dimensions';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { Hero } from 'src/core/Hero/Hero';
import { nameof } from 'src/common/nameof';

const screenName = nameof<RootStackParamsList>('HeroView');

interface StateProps {
  heroes: HeroVm[];
}

interface DispatchProps {
  update: (hero: Hero) => void;
}

interface OwnProps {
  navigation: StackNavigationProp<RootStackParamsList, typeof screenName>;
  route: RouteProp<RootStackParamsList, typeof screenName>;
}

type Props = StateProps & OwnProps & DispatchProps;

const HeroView = ({ heroes, route, navigation, update }: Props) => {
  let heroVm = heroes.find(x => route.params?.hero === x.name);
  const [isMonster, setIsMonster] = useState(false);
  if (!heroVm) {
    heroVm = Monsters;
    !isMonster && setIsMonster(true);
  }

  const [heroModel, setHeroModel] = useState(heroVm);
  const hero = new Hero(heroModel.heroClass, heroModel.name, heroModel.defaultModifiers, { ...heroModel });

  const onDraw = () => {
    hero.draw();
    setHeroModel(new HeroVm(hero));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      update(hero);
    });
    return unsubscribe;
  }, [navigation, hero]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch' }}>
        <Text style={{ fontFamily: FontFamily.SemiBold, fontSize: 24, textAlign: 'center', marginBottom: 24 }}>{hero.name}</Text>
        <TouchableOpacity
          style={{ position: 'absolute', right: 16, backgroundColor: '#666', padding: 8, paddingLeft: 9, borderRadius: 24 }}
          onPress={() => {
            hero.shuffle(true);
            setHeroModel(new HeroVm(hero));
          }}>
          <Image source={reload} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onDraw}>
        <View style={styles.draw}>
          {hero.lastDrawn ? <Image source={hero.lastDrawn.image} style={styles.modifier} /> : <Text>Tap to Draw</Text>}
        </View>
      </TouchableOpacity>
      <Text style={{ marginTop: 32, color: '#000', alignSelf: 'stretch', textAlign: 'center' }}>
        {(typeof hero.lastDrawn?.attack === 'number' ? [hero.lastDrawn.attack.toString()] : [])
          .concat(hero.lastDrawn?.effects ? hero.lastDrawn.effects : [])
          .join(' ')}
      </Text>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 96,
          flexDirection: 'row',
          width: width,
          justifyContent: 'space-around',
          alignItems: 'stretch',
        }}>
        {!isMonster && (
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={() => {
              hero.addBless();
              setHeroModel(new HeroVm(hero));
            }}>
            <Text style={{ textAlign: 'center' }}>Bless</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            hero.addCurse();
            setHeroModel(new HeroVm(hero));
          }}>
          <Text style={{ textAlign: 'center' }}>Curse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    heroes: state.heroes.heroes,
  }),
  { update: updateHero }
)(HeroView);
