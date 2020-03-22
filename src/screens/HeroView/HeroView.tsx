import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { RootState } from 'src/store/store';
import { reload, trash } from 'assets/images';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { Hero } from 'src/core/Hero/Hero';
import { HeroClass } from 'src/core/HeroClass';
import Deck from './components/Deck';
import { isEqual } from 'lodash';
import { bless, curse } from 'src/core/images/modifiers/base';
import { removeHero } from 'src/store/heroes/heroes';
import { activeOpacity } from 'src/core/contstants';
import { mapVmToHero } from 'src/store/heroes/models/helpers/mapVmToHero.helper';

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
    const total = hero.drawnTotal;
    const totalString = (typeof total?.attack === 'number'
      ? [`Attack: ${total.attack > 0 ? '+' : ''}${total.attack.toString()}`]
      : []
    )
      .concat(total?.heal ? [`Heal: ${total.heal > 0 ? '+' : ''}${total.heal.toString()}`] : [])
      .concat(total?.pierce ? [`Pierce: ${total.pierce > 0 ? '+' : ''}${total.pierce.toString()}`] : [])
      .concat(total?.targets ? [`Targets: ${total.targets > 0 ? '+' : ''}${total.targets.toString()}`] : [])
      .concat(total?.effects ? total.effects : [])
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
