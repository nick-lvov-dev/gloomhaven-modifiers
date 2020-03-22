import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { RootState } from 'src/store/store';
import { reload, trash } from 'assets/images';
import { HeroVm, mapVmToHero } from 'src/store/heroes/models/HeroVm';
import { Hero } from 'src/core/Hero/Hero';
import { HeroClass } from 'src/core/HeroClass';
import Deck from './components/Deck';
import { isEqual } from 'lodash';
import { bless, curse } from 'assets/images/modifiers/base';
import { removeHero } from 'src/store/heroes/heroes';
import { activeOpacity } from 'src/core/contstants';

interface StateProps {
  heroes: HeroVm[];
  blessCount: number;
  heroCurseCount: number;
}

interface DispatchProps {
  delete: (heroName: string) => void;
}

interface OwnProps {
  heroName: string;
}

type Props = StateProps & OwnProps & DispatchProps;

interface State {
  heroModel: HeroVm;
}

class HeroView extends Component<Props, State> {
  state: State = {
    heroModel: this.props.heroes.find(x => x.name === this.props.heroName)!,
  };

  componentDidUpdate({ heroes }: Props) {
    if (!isEqual(heroes, this.props.heroes)) {
      this.setState({ heroModel: this.props.heroes.find(x => x.name === this.props.heroName)! });
    }
  }
  get isMonster() {
    return this.state.heroModel.heroClass === HeroClass.Monsters;
  }
  getOtherCursesCount = (hero: Hero) => {
    return this.isMonster ? 0 : this.props.heroCurseCount - hero.cursesTotal;
  };
  getOtherBlessesCount = (hero: Hero) => {
    return this.props.blessCount - hero.blessesTotal;
  };

  onDraw = (hero: Hero) => this.setState({ heroModel: new HeroVm(hero) });

  onShuffle = (hero: Hero) => {
    hero.shuffle(true);
    this.setState({ heroModel: new HeroVm(hero) });
  };

  onAddBless = (hero: Hero) => {
    if (this.getOtherBlessesCount(hero) + hero.blessesTotal === 10) return;
    hero.addBless();
    this.setState({ heroModel: new HeroVm(hero) });
  };

  onAddCurse = (hero: Hero) => {
    if (this.getOtherCursesCount(hero) + hero.cursesTotal === 10) return;
    hero.addCurse();
    this.setState({ heroModel: new HeroVm(hero) });
  };

  delete = () => this.props.delete(this.props.heroName);

  render() {
    const hero = mapVmToHero(this.state.heroModel);
    const totalString = (typeof hero.drawnTotal?.attack === 'number'
      ? [`Attack: ${hero.drawnTotal.attack > 0 ? '+' : ''}${hero.drawnTotal.attack.toString()}`]
      : []
    )
      .concat(hero.drawnTotal?.heal ? [`Heal: ${hero.drawnTotal.heal > 0 ? '+' : ''}${hero.drawnTotal.heal.toString()}`] : [])
      .concat(hero.drawnTotal?.pierce ? [`Pierce: ${hero.drawnTotal.pierce > 0 ? '+' : ''}${hero.drawnTotal.pierce.toString()}`] : [])
      .concat(hero.drawnTotal?.targets ? [`Targets: ${hero.drawnTotal.targets > 0 ? '+' : ''}${hero.drawnTotal.targets.toString()}`] : [])
      .concat(hero.drawnTotal?.effects ? hero.drawnTotal.effects : [])
      .join(' ');
    return (
      <View style={styles.container}>
        {!this.isMonster && (
          <TouchableOpacity activeOpacity={activeOpacity} style={styles.deleteWrapper} onPress={this.delete}>
            <Image source={trash} style={styles.delete} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.remaining}>Remaining: {hero.remainingModifiers.length}</Text>
          <TouchableOpacity style={styles.shuffleWrapper} onPress={() => this.onShuffle(hero)} activeOpacity={activeOpacity}>
            <Image source={reload} style={styles.shuffle} />
          </TouchableOpacity>
        </View>
        <Text style={styles.total}>{totalString}</Text>
        <View style={styles.deckContainer}>
          <Deck hero={hero} onDraw={this.onDraw} />
        </View>
        <View style={styles.blessCurseContainer}>
          <TouchableOpacity style={styles.blessCurseWrapper} onPress={() => this.onAddBless(hero)}>
            <Image source={bless} style={styles.blessCurseImage} />
            <Text style={styles.blessCurseCount}>{hero.blessesTotal}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blessCurseWrapper} onPress={() => this.onAddCurse(hero)}>
            <Image source={curse} style={styles.blessCurseImage} />
            <Text style={styles.blessCurseCount}>{hero.cursesTotal}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => {
    const { heroes, blessCount, heroCurseCount } = state.heroes;
    return { heroes, blessCount, heroCurseCount };
  },
  { delete: removeHero },
  null,
  { forwardRef: true }
)(HeroView);
