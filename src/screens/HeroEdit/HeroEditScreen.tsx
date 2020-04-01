import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from 'src/AppNavigator/models/RootStackParamsList';
import { RouteProp } from '@react-navigation/native';
import { nameof } from 'src/common/helpers/nameof.helper';
import HeroEdit from './components/HeroEdit/HeroEdit';

const screenName = nameof<RootStackParamsList>('HeroEdit');

interface Props {
  navigation: StackNavigationProp<RootStackParamsList, typeof screenName>;
  route: RouteProp<RootStackParamsList, typeof screenName>;
}

export default ({ navigation, route }: Props) => {
  const heroClass = route.params?.hero;

  return <HeroEdit heroClass={heroClass} onSubmit={() => navigation.goBack()} onCancel={() => navigation.goBack()} />;
};
