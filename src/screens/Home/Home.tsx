import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from 'src/AppNavigator/models/RootStackParamsList';
import Loader from '../../components/Loader/Loader';
import { connect } from 'react-redux';
import { loadHeroes, addHero, removeHero, updateHero } from 'src/store/heroes/heroes';
import { RootState } from 'src/store/store';
import { HeroClass } from 'src/core/HeroClass';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { Monsters } from 'src/common/Monsters';
import { TabView, TabBar } from 'react-native-tab-view';
import HeroView from '../HeroView/HeroView';
import HomeSideMenu from './components/HomeSideMenu';
import SideMenu from 'src/components/SideMenu/SideMenu';
import styles from './styles';

interface StateProps {
  heroes: HeroVm[];
  isLoading: boolean;
  heroesLoaded: boolean;
}

interface DispatchProps {
  loadHeroesData: () => void;
  remove: (hero: string) => void;
  add: (hero: HeroVm) => void;
  update: (hero: HeroVm) => void;
}

interface OwnProps {
  navigation: StackNavigationProp<RootStackParamsList, 'Home'>;
}

type Props = OwnProps & StateProps & DispatchProps;

interface TabRoute {
  key: keyof typeof HeroClass;
  title: string;
}

const Home = ({ isLoading, heroes: heroVms, navigation, loadHeroesData, add, update, heroesLoaded }: Props) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const routes: TabRoute[] = useMemo(() => heroVms.map(({ heroClass, name }) => ({ key: heroClass, title: name })), [heroVms.length]);
  const refs = (Object.keys(HeroClass) as Array<keyof typeof HeroClass>).reduce((acc, val) => ({ ...acc, [val]: useRef(null) }), {});
  const renderScene = ({ route: { key } }: { route: TabRoute }) => {
    return <HeroView heroName={heroVms.find(hero => hero.heroClass === key)!.name} ref={refs[key]} />;
  };
  const blurUpdate = useCallback(() => update(refs[routes[index].key].current?.state?.heroModel), [update, refs, routes, index]);

  useEffect(() => {
    loadHeroesData();
  }, [loadHeroesData]);
  useEffect(() => {
    if (heroesLoaded && !heroVms.some(x => x.heroClass === HeroClass.Monsters)) {
      add(new HeroVm(Monsters));
    }
  }, [heroesLoaded]);
  useEffect(() => {
    const sub = navigation.addListener('blur', blurUpdate);
    return sub;
  }, [blurUpdate]);
  return (
    <>
      <Loader active={isLoading} />
      <SideMenu
        menu={
          <HomeSideMenu
            heroes={heroVms}
            onAddHero={() => {
              navigation.navigate('HeroEdit');
              setIsSideMenuOpen(false);
            }}
            onHeroPress={hero => {
              navigation.navigate('HeroEdit', { hero: hero.name });
              setIsSideMenuOpen(false);
            }}
          />
        }
        isOpen={isSideMenuOpen}
        onChange={value => setIsSideMenuOpen(value)}
        anchorWidth={16}>
        <View style={styles.container}>
          {heroesLoaded ? (
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={i => {
                if (index < routes.length) update(refs[routes[index].key].current?.state?.heroModel);
                setIndex(i);
              }}
              sceneContainerStyle={styles.sceneContainer}
              renderTabBar={props => <TabBar {...props} style={styles.tabBar} indicatorStyle={styles.tabIndicator} />}
              lazy
            />
          ) : null}
        </View>
      </SideMenu>
    </>
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
    add: addHero,
    remove: removeHero,
    update: updateHero,
  }
)(Home);
