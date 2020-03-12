import React, { useState, useEffect, useMemo } from 'react';
import { Text, View, TouchableOpacity, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from 'src/AppNavigator/models/RootStackParamsList';
import { RouteProp } from '@react-navigation/native';
import { updateHero } from 'src/store/heroes/heroes';
import { connect } from 'react-redux';
import { RootState } from 'src/store/store';
import { FontFamily } from 'src/core/FontFamily';
import { reload } from 'assets/images';
import { width } from 'src/core/Dimensions';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { Hero } from 'src/core/Hero/Hero';
import { nameof } from 'src/common/nameof';
import { HeroClass } from 'src/core/HeroClass';

const screenName = nameof<RootStackParamsList>('HeroView');

interface StateProps {
  heroes: HeroVm[];
  blessCount: number;
  heroCurseCount: number;
}

interface DispatchProps {
  update: (hero: Hero) => void;
}

interface OwnProps {
  navigation: StackNavigationProp<RootStackParamsList, typeof screenName>;
  route: RouteProp<RootStackParamsList, typeof screenName>;
}

type Props = StateProps & OwnProps & DispatchProps;

const animationDuration = 300;
const animationDelay = 200;
const cardStartOffset = 40;

const HeroView = ({ heroes, blessCount, heroCurseCount, route, navigation, update }: Props) => {
  const [animatedCardTop] = useState(new Animated.Value(cardStartOffset));
  const [animatedCardOpacity] = useState(new Animated.Value(0));
  const heroVm = route.params?.hero
    ? heroes.find(x => route.params!.hero === x.name)
    : heroes.find(x => x.heroClass === HeroClass.Monsters);
  if (!heroVm)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Failed to load Hero. Please restart the app.</Text>
      </View>
    );

  const isMonster = heroVm.heroClass === HeroClass.Monsters;
  const [heroModel, setHeroModel] = useState(heroVm);
  const [isDrawing, setIsDrawing] = useState(false);
  const hero = new Hero(heroModel.heroClass, heroModel.name, heroModel.defaultModifiers, { ...heroModel });
  const otherCursesCount = useMemo(() => (isMonster ? 0 : heroCurseCount - hero.cursesTotal), [isMonster, heroCurseCount]);
  const otherBlessesCount = useMemo(() => blessCount - hero.blessesTotal, [blessCount]);

  const onDraw = () => {
    hero.draw();
    setHeroModel(new HeroVm(hero));
    animatedCardTop.setValue(cardStartOffset);
    setIsDrawing(true);
    Animated.parallel([
      Animated.timing(animatedCardTop, {
        toValue: 0,
        duration: animationDuration,
      }),
      Animated.timing(animatedCardOpacity, {
        toValue: 1,
        duration: animationDuration,
      }),
    ]).start(() => {
      setTimeout(() => setIsDrawing(false), animationDelay);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      update(hero);
    });
    return unsubscribe;
  }, [navigation, hero]);

  const lastDrawn = hero.lastDrawn();
  const lastDrawn2 = hero.lastDrawn(2);

  if (lastDrawn && lastDrawn.next && !isDrawing) onDraw();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch' }}>
        <Text style={{ fontFamily: FontFamily.SemiBold, fontSize: 24, textAlign: 'center', marginBottom: 12 }}>{hero.name}</Text>
        <TouchableOpacity
          style={{ position: 'absolute', right: 32, backgroundColor: '#666', padding: 8, paddingLeft: 9, borderRadius: 24 }}
          onPress={() => {
            hero.shuffle(true);
            setHeroModel(new HeroVm(hero));
          }}>
          <Image source={reload} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
      <Text style={{ fontFamily: FontFamily.SemiBold, fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
        Remaining: {hero.remainingModifiers.length}
      </Text>
      <TouchableWithoutFeedback onPress={() => !isDrawing && onDraw()}>
        <View style={styles.draw}>
          {lastDrawn2 ? <Image source={lastDrawn2.image} style={styles.modifier} /> : <Text>Tap to Draw</Text>}
          {lastDrawn ? (
            <Animated.View style={[styles.drawnModifierWrapper, { top: animatedCardTop, opacity: animatedCardOpacity }]}>
              <Image source={lastDrawn.image} style={styles.modifier} />
            </Animated.View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <Text style={{ marginTop: 32, color: '#000', alignSelf: 'stretch', textAlign: 'center' }}>
        {(typeof hero.drawnTotal?.attack === 'number'
          ? [`Attack: ${hero.drawnTotal.attack > 0 ? '+' : ''}${hero.drawnTotal.attack.toString()}`]
          : []
        )
          .concat(hero.drawnTotal?.heal ? [`Heal: ${hero.drawnTotal.heal > 0 ? '+' : ''}${hero.drawnTotal.heal.toString()}`] : [])
          .concat(hero.drawnTotal?.pierce ? [`Pierce: ${hero.drawnTotal.pierce > 0 ? '+' : ''}${hero.drawnTotal.pierce.toString()}`] : [])
          .concat(
            hero.drawnTotal?.targets ? [`Targets: ${hero.drawnTotal.targets > 0 ? '+' : ''}${hero.drawnTotal.targets.toString()}`] : []
          )
          .concat(hero.drawnTotal?.effects ? hero.drawnTotal.effects : [])
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
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            if (otherBlessesCount + hero.blessesTotal === 10) return;

            hero.addBless();
            setHeroModel(new HeroVm(hero));
          }}>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>Bless</Text>
          <Text style={{ textAlign: 'center' }}>{hero.blessesTotal}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center' }}
          onPress={() => {
            if (otherCursesCount + hero.cursesTotal === 10) return;

            hero.addCurse();
            setHeroModel(new HeroVm(hero));
          }}>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>Curse</Text>
          <Text style={{ textAlign: 'center' }}>{hero.cursesTotal}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => {
    const { heroes, blessCount, heroCurseCount } = state.heroes;
    return { heroes, blessCount, heroCurseCount };
  },
  { update: updateHero }
)(HeroView);
