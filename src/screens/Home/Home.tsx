import React, { useEffect, useState, useMemo, useRef } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from 'src/AppNavigator/models/RootStackParamsList';
import Loader from '../../components/Loader/Loader';
import { connect } from 'react-redux';
import { loadHeroes, addHero, removeHero, updateHero } from 'src/store/heroes/heroes';
import { RootState } from 'src/store/store';
import { HeroClass } from 'src/core/HeroClass';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { Monsters } from 'src/common/Monsters';
import { menu } from 'assets/images';
import { TabView, TabBar } from 'react-native-tab-view';
import HeroView from '../HeroView/HeroView';
import { FontFamily } from 'src/core/FontFamily';
import HomeSideMenu from './components/HomeSideMenu';
import SideMenu from 'src/components/SideMenu/SideMenu';
import { colors } from 'src/core/colors';

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

  useEffect(() => {
    loadHeroesData();
  }, []);
  useEffect(() => {
    if (heroesLoaded && !heroVms.some(x => x.heroClass === HeroClass.Monsters)) {
      add(new HeroVm(Monsters));
    }
  }, [heroesLoaded]);
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
        onChange={value => setIsSideMenuOpen(value)}>
        <View style={{ flex: 1, alignItems: 'stretch' }}>
          {heroesLoaded ? (
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={i => {
                if (index < routes.length) update(refs[routes[index].key].current?.state?.heroModel);
                setIndex(i);
              }}
              sceneContainerStyle={{ flex: 1 }}
              renderTabBar={props => (
                <TabBar {...props} style={{ backgroundColor: '#333' }} indicatorStyle={{ backgroundColor: colors.red }} />
              )}
              lazy
            />
          ) : null}
        </View>
      </SideMenu>
      {/* <View style={styles.addHeroButtonWrapper}>
        <TouchableHighlight
          underlayColor={'#ccc'}
          style={[styles.button, { marginBottom: 16 }]}
          onPress={() => navigation.navigate('HeroView')}>
          <Image source={heroIcons.Monsters} style={styles.buttonIcon} />
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('HeroEdit')}>
          <Image source={plus} style={styles.buttonIcon} />
        </TouchableHighlight>
      </View> */}
      {/* <SelectModal
        isVisible={isHeroModalVisible}
        items={(Object.keys(HeroModalActions) as Array<keyof typeof HeroModalActions>).map(name => ({ name }))}
        onBackdropPress={closeHeroModal}
        onBackButtonPress={closeHeroModal}
        onSelect={onHeroModalAction}
      /> */}
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
