import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { RootState } from 'src/store/store';
import { reload, advantageDisadvantage, roundShadow, edit, plus, undo } from 'assets/images';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import { Hero } from 'src/core/Hero/Hero';
import { HeroClass } from 'src/core/HeroClass';
import Deck from './components/Deck/Deck';
import { removeHero } from 'src/store/heroes/heroes';
import { activeOpacity } from 'src/core/contstants';
import { mapVmToHero } from 'src/store/heroes/models/helpers/mapVmToHero.helper';
import effectIcons from 'src/core/images/effectIcons';
import DrawTwo from './components/DrawTwo/DrawTwo';
import HeroAction from './components/HeroAction/HeroAction';
import valueIcons from 'src/core/images/valueIcons';
import DrawTotal from './components/DrawTotal/DrawTotal';
import SquareIcon from 'src/components/SquareIcon/SquareIcon';
import RoundIcon from 'src/components/RoundIcon/RoundIcon';
import { isEqual } from 'lodash';

interface StateProps {
  hero: HeroVm;
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
  history: HeroVm[];
  heroModel: HeroVm;
  isDrawTwo: boolean;
}

class HeroView extends Component<Props, State> {
  state: State = {
    history: [],
    heroModel: this.props.hero,
    isDrawTwo: false,
  };

  private _save = (hero: HeroVm) => this.setState({ history: [...this.state.history, this.state.heroModel], heroModel: hero });

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps.hero, this.props.hero)) {
      this._save(this.props.hero);
    }
  }

  get isMonster() {
    return this.state.heroModel.heroClass === HeroClass.Monsters;
  }

  get hero() {
    return mapVmToHero(this.state.heroModel);
  }

  get otherCursesCount() {
    return this.isMonster ? 0 : this.props.heroCurseCount - mapVmToHero(this.props.hero).cursesTotal;
  }

  get otherBlessesCount() {
    return this.props.blessCount - mapVmToHero(this.props.hero).blessesTotal;
  }

  get otherMinusOneCount() {
    return this.props.blessCount - mapVmToHero(this.props.hero).extraMinusOneTotal;
  }

  onDraw = (hero: Hero) => !hero.lastDrawn()?.next && this._save(new HeroVm(hero));

  onShuffle = (hero: Hero) => {
    hero.shuffle(true);
    this._save(new HeroVm(hero));
  };

  onAddBless = (hero: Hero) => {
    if (this.otherBlessesCount + hero.blessesTotal === 10) return;
    hero.addBless();
    this._save(new HeroVm(hero));
  };

  onAddCurse = (hero: Hero) => {
    if (this.otherCursesCount + hero.cursesTotal === 10) return;
    hero.addCurse();
    this._save(new HeroVm(hero));
  };

  onAddMinusOne = (hero: Hero) => {
    if (this.otherMinusOneCount + hero.extraMinusOneTotal === 10) return;
    hero.addMinusOne();
    this._save(new HeroVm(hero));
  };

  onDrawTwo = () => this.setState({ isDrawTwo: true });

  onDrawTwoClose = (hero: Hero) => this.setState({ isDrawTwo: false }, () => this._save(new HeroVm(hero)));

  delete = () => this.props.delete(this.props.heroClass);

  undo = () => {
    const { history } = this.state;
    if (!history.length) return;
    this.setState({ history: history.slice(0, history.length - 1), heroModel: history.slice(-1)[0] });
  };

  render() {
    const hero = this.hero;
    const total = hero.drawnTotal;

    return (
      <>
        <DrawTwo hero={this.state.heroModel} visible={this.state.isDrawTwo} onClose={this.onDrawTwoClose} />
        <View style={styles.container}>
          <View style={styles.modifiers}>
            <TouchableOpacity activeOpacity={activeOpacity} onPress={() => this.onAddBless(hero)} style={styles.modifier}>
              <SquareIcon image={effectIcons.Bless} />
              <Text style={styles.modifierActionText}>{hero.blessesTotal}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={activeOpacity} onPress={() => this.onAddCurse(hero)} style={styles.modifier}>
              <SquareIcon image={effectIcons.Curse} />
              <Text style={styles.modifierActionText}>{hero.cursesTotal}</Text>
            </TouchableOpacity>
            {!this.isMonster ? (
              <TouchableOpacity activeOpacity={activeOpacity} onPress={() => this.onAddMinusOne(hero)} style={styles.modifier}>
                <RoundIcon image={valueIcons['-1']} />
                <Text style={styles.modifierActionText}>{hero.extraMinusOneTotal}</Text>
              </TouchableOpacity>
            ) : null}
            <HeroAction image={reload} onPress={() => this.onShuffle(hero)} style={styles.shuffleWrapper} imageStyle={styles.shuffle} />
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
          {total?.next ? <DrawTotal total={total} /> : null}
          <View style={styles.deckContainer}>
            <TouchableOpacity activeOpacity={activeOpacity} onPress={this.onDrawTwo} style={styles.advantageDisadvantageWrapper}>
              <Image source={advantageDisadvantage} style={styles.advantageDisadvantage} />
            </TouchableOpacity>
            <Deck hero={hero} onDraw={this.onDraw} />
            {this.state.history.length ? (
              <TouchableOpacity activeOpacity={activeOpacity} onPress={this.undo} style={styles.undoWrapper}>
                <Image source={undo} style={styles.undo} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  (state, ownProps) => {
    const { heroes, blessCount, heroCurseCount } = state.heroes;
    return { hero: heroes.find(x => x.heroClass === ownProps.heroClass)!, blessCount, heroCurseCount };
  },
  { delete: removeHero },
  null,
  { forwardRef: true }
)(HeroView);
