import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { RootState } from 'src/store/store';
import { reload, trash, advantageDisadvantage, effectShadow, roundShadow, edit, plus } from 'assets/images';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { Hero } from 'src/core/Hero/Hero';
import { HeroClass } from 'src/core/HeroClass';
import Deck from './components/Deck/Deck';
import { isEqual } from 'lodash';
import { removeHero } from 'src/store/heroes/heroes';
import { activeOpacity } from 'src/core/contstants';
import { mapVmToHero } from 'src/store/heroes/models/helpers/mapVmToHero.helper';
import DrawTwo from './components/DrawTwo/DrawTwo';
import statusIcons from 'src/core/images/statusIcons';
import HeroAction from './components/HeroAction/HeroAction';
import { width } from 'src/core/Dimensions';

interface StateProps {
  heroes: HeroVm[];
  blessCount: number;
  heroCurseCount: number;
}

interface DispatchProps {
  delete: (heroClass: HeroClass) => void;
}

interface OwnProps {
  heroClass: HeroClass;
  onEdit?: () => void;
}

type Props = StateProps & OwnProps & DispatchProps;

interface State {
  heroModel: HeroVm;
  isDrawTwo: boolean;
}

class HeroView extends Component<Props, State> {
  state: State = {
    heroModel: this.props.heroes.find(x => x.heroClass === this.props.heroClass)!,
    isDrawTwo: false,
  };

  componentDidUpdate({ heroes }: Props) {
    if (!isEqual(heroes, this.props.heroes)) {
      this.setState({ heroModel: this.props.heroes.find(x => x.heroClass === this.props.heroClass)! });
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

  onAddMinusOne = (hero: Hero) => {
    hero.addMinusOne();
    this.setState({ heroModel: new HeroVm(hero) });
  };

  onDrawTwo = () => this.setState({ isDrawTwo: true });

  onDrawTwoClose = (hero: Hero) => this.setState({ isDrawTwo: false, heroModel: new HeroVm(hero) });

  delete = () => this.props.delete(this.props.heroClass);

  render() {
    const hero = this.hero;
    const total = hero.drawnTotal;

    return (
      <>
        <DrawTwo hero={this.state.heroModel} visible={this.state.isDrawTwo} onClose={this.onDrawTwoClose} />
        <View style={styles.container}>
          <View style={styles.modifiers}>
            <TouchableOpacity activeOpacity={activeOpacity} onPress={() => this.onAddBless(hero)} style={styles.modifier}>
              <Image source={statusIcons.Bless} style={styles.modifierAction} />
              <Image source={effectShadow} style={styles.actionShadow} />
              <Text style={styles.modifierActionText}>{hero.blessesTotal}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={activeOpacity} onPress={() => this.onAddCurse(hero)} style={styles.modifier}>
              <Image source={statusIcons.Curse} style={styles.modifierAction} />
              <Image source={effectShadow} style={styles.actionShadow} />
              <Text style={styles.modifierActionText}>{hero.cursesTotal}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={activeOpacity} onPress={() => this.onAddMinusOne(hero)} style={styles.modifier}>
              <Image source={statusIcons.MinusOne} style={styles.modifierAction} />
              <Image source={roundShadow} style={styles.actionShadow} />
              <Text style={styles.modifierActionText}>{hero.extraMinusOneTotal}</Text>
            </TouchableOpacity>
            <HeroAction
              image={reload}
              onPress={() => this.onShuffle(hero)}
              style={styles.shuffleWrapper}
              imageStyle={{ transform: [{ rotateY: '180deg' }] }}
            />
          </View>
          <View style={styles.actions}>
            {!this.isMonster && (
              <>
                {this.props.onEdit && <HeroAction image={edit} onPress={this.props.onEdit} style={styles.action} />}
                <HeroAction
                  image={plus}
                  onPress={this.delete}
                  style={[styles.action, styles.heroAction, styles.deleteWrapper]}
                  imageStyle={styles.delete}
                />
              </>
            )}
          </View>
          <Text style={styles.total}>{total}</Text>
          <View style={styles.deckContainer}>
            <TouchableOpacity activeOpacity={activeOpacity} onPress={this.onDrawTwo} style={styles.advantageDisadvantageWrapper}>
              <Image source={advantageDisadvantage} style={styles.advantageDisadvantage} />
            </TouchableOpacity>
            <Deck hero={hero} onDraw={this.onDraw} />
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
