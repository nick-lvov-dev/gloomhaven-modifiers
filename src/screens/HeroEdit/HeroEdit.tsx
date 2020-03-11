import React, { useState } from 'react';
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
import { addHero, updateHero } from 'src/store/heroes/heroes';
import { RouteProp } from '@react-navigation/native';
import { nameof } from 'src/common/nameof';
import Checkbox from 'src/components/Checkbox/Checkbox';
import Accordion from 'react-native-collapsible/Accordion';
import ClassUpgrades from 'src/core/ClassUpdgrades/ClassUpgrades';
import { FontFamily } from 'src/core/FontFamily';
import { ClassUpgrade } from 'src/core/ClassUpdgrades/models/ClassUpgrade';
import { range } from 'src/common/range';

const screenName = nameof<RootStackParamsList>('HeroEdit');

interface StateProps {
  isLoading: boolean;
  heroes: HeroVm[];
}

interface DispatchProps {
  add: (hero: Hero) => void;
  edit: (hero: Hero) => void;
}

interface OwnProps {
  navigation: StackNavigationProp<RootStackParamsList, typeof screenName>;
  route: RouteProp<RootStackParamsList, typeof screenName>;
}

type Props = StateProps & OwnProps & DispatchProps;

const AddHero = ({ navigation, isLoading, add, edit, heroes, route }: Props) => {
  let heroVm = heroes.find(x => route.params?.hero === x.name);
  const isEdit = !!heroVm;
  const [name, setName] = useState(heroVm?.name ?? '');
  const [heroClass, setHeroClass] = useState(classes.find(x => x.name === heroVm?.heroClass) ?? classes[0]);
  const [upgrades, setUpgrades] = useState<ClassUpgrade[]>(heroVm?.upgrades ?? []);
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const onSubmit = () => {
    if (isEdit) {
      const hero = new Hero(heroClass.name, name, heroVm!.defaultModifiers, { upgrades: heroVm!.upgrades });
      hero.updateUpgrades(upgrades);

      edit(hero);
    } else add(new Hero(heroClass.name, name, StandardModifierDeck));
    navigation.goBack();
  };
  return (
    <>
      <Loader active={isLoading} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 32 }}>
          <TextFormField label="Name" value={name} onChange={setName} />
          <SelectFormField
            label="Class"
            value={heroClass}
            onChange={setHeroClass}
            items={classes.filter(x => x.name !== HeroClass.Monsters)}
            renderItem={item => (
              <View key={item.id} style={styles.heroItem}>
                <Text style={styles.heroItemText}>{item.name}</Text>
                <Image style={styles.heroIcon} source={item.icon} />
              </View>
            )}
            renderValue={item => (
              <View key={item.id} style={styles.heroValue}>
                <Text style={styles.heroValueText}>{item.name}</Text>
                <Image style={styles.heroIcon} source={item.icon} />
              </View>
            )}
          />
          {isEdit && (
            <Accordion
              touchableComponent={TouchableOpacity}
              activeSections={activeSections}
              renderHeader={() => (
                <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: FontFamily.SemiBold, paddingVertical: 16 }}>Upgrades</Text>
              )}
              onChange={setActiveSections}
              sections={['Upgrades']}
              renderContent={() => (
                <>
                  {Object.keys(ClassUpgrades[heroVm!.heroClass]).map(key => (
                    <View
                      key={key}
                      style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', marginBottom: 16 }}>
                      <View style={{ flexDirection: 'row' }}>
                        {range(ClassUpgrades[heroVm!.heroClass][key].limit).map(i => (
                          <Checkbox
                            style={{ marginRight: 8 }}
                            key={'checkbox_' + key + '_' + i}
                            checked={upgrades.filter(x => x.name === ClassUpgrades[heroVm!.heroClass][key].name).length >= i}
                            onChange={checked => {
                              if (checked) {
                                setUpgrades(upgrades.concat([ClassUpgrades[heroVm!.heroClass][key]]));
                              } else {
                                const index = upgrades.findIndex(x => x.name === ClassUpgrades[heroVm!.heroClass][key].name);
                                setUpgrades(upgrades.slice(0, index).concat(upgrades.slice(index + 1)));
                              }
                            }}
                          />
                        ))}
                      </View>
                      <Text style={{ fontFamily: FontFamily.Regular, fontSize: 16 }}>{ClassUpgrades[heroVm!.heroClass][key].name}</Text>
                    </View>
                  ))}
                </>
              )}
            />
          )}
          <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.button}>{isEdit ? 'Edit' : 'Create'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(state => ({ ...state.heroes }), {
  add: addHero,
  edit: updateHero,
})(AddHero);
