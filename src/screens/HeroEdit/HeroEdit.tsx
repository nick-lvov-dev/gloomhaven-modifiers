import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { classes, HeroClass } from 'src/core/HeroClass';
import TextFormField from '../../components/FormField/TextFormField';
import SelectFormField from '../../components/FormField/SelectFormField';
import Loader from '../../components/Loader/Loader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from 'src/AppNavigator/models/RootStackParamsList';
import { connect } from 'react-redux';
import { RootState } from 'src/store/store';
import StandardModifierDeck from 'src/core/ModifierDecks/StandardModifierDeck';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { Hero } from 'src/core/Hero/Hero';
import { RouteProp } from '@react-navigation/native';
import { nameof } from 'src/common/helpers/nameof.helper';
import Accordion from 'react-native-collapsible/Accordion';
import ClassUpgrades from 'src/core/ClassUpdgrades/ClassUpgrades';
import { ClassUpgrade } from 'src/core/ClassUpdgrades/models/ClassUpgrade';
import { addHero, updateHero } from 'src/store/heroes/heroes';
import HeroEditUpgrade from './components/HeroEditUpgrade/HeroEditUpgrade';
import { mapModifierIdsToModifiers } from 'src/store/heroes/models/helpers/mapModifierIdsToModifiers.helper';
import { activeOpacity } from 'src/core/contstants';
import ClassSelect from './components/ClassSelect/ClassSelect';

const screenName = nameof<RootStackParamsList>('HeroEdit');

interface StateProps {
  isLoading: boolean;
  heroes: HeroVm[];
}

interface DispatchProps {
  add: (hero: HeroVm) => void;
  edit: (hero: HeroVm) => void;
}

interface OwnProps {
  navigation: StackNavigationProp<RootStackParamsList, typeof screenName>;
  route: RouteProp<RootStackParamsList, typeof screenName>;
}

type Props = StateProps & OwnProps & DispatchProps;

const AddHero = ({ navigation, isLoading, add, edit, heroes, route }: Props) => {
  let heroVm = heroes.find(x => route.params?.hero === x.name);
  const availableClasses = useMemo(
    () =>
      classes.filter(
        heroClass =>
          heroClass.name !== HeroClass.Monsters &&
          (heroClass.name === heroVm?.heroClass || !heroes.some(hero => hero.heroClass === heroClass.name))
      ),
    [heroes]
  );
  const isEdit = !!heroVm;
  const [name, setName] = useState(heroVm?.name ?? '');
  const [heroClass, setHeroClass] = useState(classes.find(x => x.name === heroVm?.heroClass) ?? availableClasses[0]);
  const [upgrades, setUpgrades] = useState<ClassUpgrade[]>(heroVm?.upgrades ?? []);
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [isClassSelectOpen, setIsClassSelectOpen] = useState(false);
  useEffect(() => {
    if (!isEdit || heroVm!.heroClass !== heroClass.name) setUpgrades([]);
  }, [heroClass]);
  const onSubmit = () => {
    const hero = new Hero(
      heroClass.name,
      name,
      isEdit ? mapModifierIdsToModifiers(heroClass.name, heroVm!.defaultModifiers) : StandardModifierDeck,
      {
        upgrades: isEdit ? heroVm!.upgrades : [],
      }
    );
    hero.updateUpgrades(upgrades);

    isEdit ? edit(new HeroVm(hero)) : add(new HeroVm(hero));
    navigation.goBack();
  };
  return (
    <>
      <Loader active={isLoading} />
      <ClassSelect
        isVisible={isClassSelectOpen}
        onBackdropPress={() => setIsClassSelectOpen(false)}
        onBackButtonPress={() => setIsClassSelectOpen(false)}
        onSelect={heroClass => {
          setHeroClass(heroClass);
          setIsClassSelectOpen(false);
        }}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <TextFormField style={{ flex: 1 }} label="Name" value={name} onChange={setName} />
              <TouchableOpacity
                activeOpacity={activeOpacity}
                disabled={availableClasses.length < 2}
                onPress={() => setIsClassSelectOpen(true)}>
                <Image style={styles.heroIcon} source={heroClass.icon} />
              </TouchableOpacity>
            </View>
            <Accordion
              touchableComponent={TouchableOpacity}
              activeSections={activeSections}
              renderHeader={() => <Text style={styles.upgrades}>Upgrades</Text>}
              onChange={setActiveSections}
              sections={['Upgrades']}
              renderContent={() => (
                <>
                  {Object.keys(ClassUpgrades[heroClass.name]).map(key => (
                    <HeroEditUpgrade
                      key={key}
                      upgrade={ClassUpgrades[heroClass.name][key]}
                      checkedCount={upgrades.filter(x => x.name === ClassUpgrades[heroClass.name][key].name).length}
                      onChange={checked => {
                        if (checked) {
                          setUpgrades(upgrades.concat([ClassUpgrades[heroClass.name][key]]));
                        } else {
                          const index = upgrades.findIndex(x => x.name === ClassUpgrades[heroClass.name][key].name);
                          setUpgrades(upgrades.slice(0, index).concat(upgrades.slice(index + 1)));
                        }
                      }}
                    />
                  ))}
                </>
              )}
            />
          </View>
          <View>
            <TouchableOpacity onPress={onSubmit}>
              <Text style={styles.button}>{isEdit ? 'Edit' : 'Create'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(state => ({ ...state.heroes }), {
  add: addHero,
  edit: updateHero,
})(AddHero);
