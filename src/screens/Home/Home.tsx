import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { View, Image, AppStateStatus, AppState } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from 'src/AppNavigator/models/RootStackParamsList';
import { connect } from 'react-redux';
import { loadHeroes, addHero, removeHero, updateHero, saveData } from 'src/store/heroes/heroes';
import { RootState } from 'src/store/store';
import { HeroClass, classes } from 'src/core/HeroClass';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { TabView, TabBar } from 'react-native-tab-view';
import HeroView from '../HeroView/HeroView';
import styles from './styles';
import HeroEdit from '../HeroEdit/components/HeroEdit/HeroEdit';
import { plus } from 'assets/images';
import { loadHistoryHintData } from 'src/store/profile';

interface StateProps {
  heroes: HeroVm[];
  isLoading: boolean;
  heroesLoaded: boolean;
}

interface DispatchProps {
  loadHeroesData: () => void;
  loadHintData: () => void;
  remove: (heroClass: HeroClass) => void;
  add: (hero: HeroVm) => void;
  update: (hero: HeroVm) => void;
  save: (arg: void) => void;
}

interface OwnProps {
  navigation: StackNavigationProp<RootStackParamsList, 'Home'>;
}

type Props = OwnProps & StateProps & DispatchProps;

interface TabRoute {
  key: string;
  title: string;
}

const Home = ({ heroes, navigation, loadHeroesData, loadHintData, update, save, heroesLoaded }: Props) => {
  const [] = useState(false);
  const [index, setIndex] = useState(0);
  const routes: TabRoute[] = useMemo(
    () =>
      heroes
        .map(({ heroClass }) => ({ key: heroClass as string, title: heroClass as string }))
        .concat(heroes.length < Math.min(classes.length, 5) ? [{ key: 'add', title: 'Add Hero' }] : []),
    [heroes]
  );
  const refs = (Object.keys(HeroClass) as Array<HeroClass>).reduce((acc, val) => ({ ...acc, [val]: useRef(null) }), {});
  const renderScene = useCallback(
    ({ route: { key } }: { route: TabRoute }) =>
      key in HeroClass ? (
        <HeroView
          heroClass={key as HeroClass}
          onEdit={() => navigation.navigate('HeroEdit', { hero: key as HeroClass })}
          isScreenActive={routes.findIndex(x => x.key === key) === index}
          ref={refs[key]}
        />
      ) : (
        <HeroEdit key={`AddHero_${index === heroes.length ? 'active' : 'inactive'}`} />
      ),
    [heroes]
  );

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (nextAppState !== 'active' && index === routes.length - 1) {
        save();
      }
    },
    [index, routes]
  );

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [handleAppStateChange]);

  useEffect(() => {
    loadHeroesData();
    loadHintData();
  }, [loadHeroesData, loadHintData]);
  useEffect(() => {
    const sub = navigation.addListener('blur', () => {
      if (index < routes.length) update(refs[routes[index].key].current?.state?.heroModel);
    });
    return sub;
  }, [update, refs, routes, index]);
  return (
    <View style={styles.container}>
      {heroesLoaded ? (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={i => {
            if (index < routes.length && routes[index].key in HeroClass) update(refs[routes[index].key].current?.state?.heroModel);
            setIndex(i);
          }}
          sceneContainerStyle={styles.sceneContainer}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={styles.tabBar}
              indicatorStyle={styles.tabIndicator}
              renderIcon={({ route: { key }, focused }) =>
                key in HeroClass ? (
                  <Image
                    source={classes.find(c => c.name === heroes.find(x => x.heroClass === key)!.heroClass)!.icon}
                    style={[styles.heroIcon, focused ? styles.heroIconFocused : null]}
                  />
                ) : (
                  <Image source={plus} style={[styles.addHeroIcon, focused ? styles.heroIconFocused : null]} />
                )
              }
              getLabelText={({ route: { key } }) => (!(key in HeroClass) ? 'Add Hero' : undefined)}
              labelStyle={styles.addHeroLabel}
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => {
    const {
      heroes: { heroes, isLoading, heroesLoaded },
    } = state;
    return { isLoading, heroesLoaded, heroes };
  },
  {
    loadHeroesData: loadHeroes,
    loadHintData: loadHistoryHintData,
    add: addHero,
    remove: removeHero,
    update: updateHero,
    save: saveData,
  }
)(Home);
