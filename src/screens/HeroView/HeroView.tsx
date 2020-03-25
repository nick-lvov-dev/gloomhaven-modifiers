import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { RootState } from 'src/store/store';
import { reload, trash, advantageDisadvantage } from 'assets/images';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { Hero } from 'src/core/Hero/Hero';
import { HeroClass } from 'src/core/HeroClass';
import Deck from './components/Deck/Deck';
import { isEqual } from 'lodash';
import { bless, curse } from 'src/core/images/modifiers/base';
import { removeHero } from 'src/store/heroes/heroes';
import { activeOpacity } from 'src/core/contstants';
import { mapVmToHero } from 'src/store/heroes/models/helpers/mapVmToHero.helper';
import DrawTwo from './components/DrawTwo/DrawTwo';

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
  isDrawTwo: boolean;
}

class HeroView extends Component<Props, State> {
  state: State = {
    heroModel: this.props.heroes.find(x => x.name === this.props.heroName)!,
    isDrawTwo: false,
  };

  componentDidUpdate({ heroes }: Props) {
    if (!isEqual(heroes, this.props.heroes)) {
      this.setState({ heroModel: this.props.heroes.find(x => x.name === this.props.heroName)! });
    }
  }
  get isMonster() {
    return this.state.heroModel.heroClass === HeroClass.Monsters;
  }

  get hero() {
    return mapVmToHero(this.state.heroModel);
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

  onDrawTwo = () => this.setState({ isDrawTwo: true });

  onDrawTwoClose = (hero: Hero) => this.setState({ isDrawTwo: false, heroModel: new HeroVm(hero) });

  delete = () => this.props.delete(this.props.heroName);

  render() {
    const hero = this.hero;
    const total = hero.drawnTotal;

    return (
      <>
        <DrawTwo hero={this.state.heroModel} visible={this.state.isDrawTwo} onClose={this.onDrawTwoClose} />
        <View style={styles.container}>
          <View style={styles.actions}>
            <TouchableOpacity activeOpacity={activeOpacity} onPress={this.onDrawTwo} style={styles.action}>
              <Image source={advantageDisadvantage} style={styles.advantageDisadvantage} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.shuffleWrapper, styles.action]}
              onPress={() => this.onShuffle(hero)}
              activeOpacity={activeOpacity}>
              <Image source={reload} style={styles.shuffle} />
            </TouchableOpacity>
            {!this.isMonster && (
              <TouchableOpacity activeOpacity={activeOpacity} onPress={this.delete} style={styles.action}>
                <Image source={trash} style={styles.delete} />
              </TouchableOpacity>
            )}
          </View>
          <View>
            <Text style={styles.remaining}>Remaining: {hero.remainingModifiers.length}</Text>
          </View>
          <Text style={styles.total}>{total}</Text>
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
      </>
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
