import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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
import { addHero } from 'src/store/heroes/heroes';
import { RouteProp } from '@react-navigation/native';
import { nameof } from 'src/common/nameof';

const screenName = nameof<RootStackParamsList>('HeroEdit');

interface StateProps {
  isLoading: boolean;
  heroes: HeroVm[];
}

interface DispatchProps {
  addNewHero: (hero: Hero) => void;
}

interface OwnProps {
  navigation: StackNavigationProp<RootStackParamsList, typeof screenName>;
  route: RouteProp<RootStackParamsList, typeof screenName>;
}

type Props = StateProps & OwnProps & DispatchProps;

const AddHero = ({ navigation, isLoading, addNewHero, heroes, route }: Props) => {
  let heroVm = heroes.find(x => route.params?.hero === x.name);
  const [name, setName] = useState(heroVm?.name ?? '');
  const [heroClass, setHeroClass] = useState(classes.find(x => x.name === heroVm?.heroClass) ?? classes[0]);
  const onSubmit = async () => {
    addNewHero(new Hero(heroClass.name, name, StandardModifierDeck));
    navigation.goBack();
  };
  return (
    <>
      <Loader active={isLoading} />
      <View style={styles.container}>
        <TextFormField label="Name" value={name} onChange={setName} />
        <SelectFormField
          label="Class"
          value={heroClass}
          onChange={setHeroClass}
          items={classes.filter(x => x.name !== HeroClass.Monsters)}
          renderItem={item => (
            <View key={item.id} style={styles.heroItem}>
              <Text>{item.name}</Text>
              <Image style={styles.heroIcon} source={item.icon} />
            </View>
          )}
        />
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.button}>Create</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(state => ({ ...state.heroes }), {
  addNewHero: addHero,
})(AddHero);
