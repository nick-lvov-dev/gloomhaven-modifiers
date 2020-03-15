import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import { plus } from 'assets/images';
import { HeroClass, classes } from 'src/core/HeroClass';
import { HeroVm } from 'src/store/heroes/models/HeroVm';

interface Props {
  heroes: HeroVm[];
  onAddHero: () => void;
  onHeroPress: (hero: HeroVm) => void;
}

export default ({ heroes, onAddHero, onHeroPress }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>Heroes</Text>
    {heroes
      .filter(hero => hero.heroClass !== HeroClass.Monsters)
      .map(hero => (
        <TouchableOpacity key={`home_side_menu_hero_${hero.name}`} activeOpacity={0.7} onPress={() => onHeroPress(hero)}>
          <Text style={styles.hero}>{hero.name}</Text>
        </TouchableOpacity>
      ))}
    {heroes.length < Math.min(classes.length - 1, 5) ? (
      <TouchableOpacity style={styles.addHeroWrapper} activeOpacity={0.7} onPress={onAddHero}>
        <Text style={styles.addHero}>Add Hero</Text>
        <Image source={plus} style={styles.addHeroIcon} />
      </TouchableOpacity>
    ) : null}
  </View>
);
