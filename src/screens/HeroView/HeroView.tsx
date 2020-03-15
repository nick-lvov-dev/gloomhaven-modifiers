import React, { forwardRef, Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { RootState } from 'src/store/store';
import { FontFamily } from 'src/core/FontFamily';
import { reload } from 'assets/images';
import { width } from 'src/core/Dimensions';
import { HeroVm, mapVmToHero } from 'src/store/heroes/models/HeroVm';
import { Hero } from 'src/core/Hero/Hero';
import { HeroClass } from 'src/core/HeroClass';
import Deck from './components/Deck';
import { isEqual } from 'lodash';
import { toast } from 'src/common/toast';

interface StateProps {
  heroes: HeroVm[];
  blessCount: number;
  heroCurseCount: number;
}

interface DispatchProps {}

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

  render() {
    const hero = mapVmToHero(this.state.heroModel);
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch' }}>
          <Text style={{ fontFamily: FontFamily.SemiBold, fontSize: 24, textAlign: 'center', marginBottom: 12 }}>{hero.name}</Text>
          <TouchableOpacity
            style={{ position: 'absolute', right: 32, backgroundColor: '#666', padding: 8, paddingLeft: 9, borderRadius: 24 }}
            onPress={() => this.onShuffle(hero)}>
            <Image source={reload} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontFamily: FontFamily.SemiBold, fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
          Remaining: {hero.remainingModifiers.length}
        </Text>
        <Deck hero={hero} onDraw={this.onDraw} />
        <Text style={{ marginTop: 32, color: '#000', alignSelf: 'stretch', textAlign: 'center' }}>
          {(typeof hero.drawnTotal?.attack === 'number'
            ? [`Attack: ${hero.drawnTotal.attack > 0 ? '+' : ''}${hero.drawnTotal.attack.toString()}`]
            : []
          )
            .concat(hero.drawnTotal?.heal ? [`Heal: ${hero.drawnTotal.heal > 0 ? '+' : ''}${hero.drawnTotal.heal.toString()}`] : [])
            .concat(hero.drawnTotal?.pierce ? [`Pierce: ${hero.drawnTotal.pierce > 0 ? '+' : ''}${hero.drawnTotal.pierce.toString()}`] : [])
            .concat(
              hero.drawnTotal?.targets ? [`Targets: ${hero.drawnTotal.targets > 0 ? '+' : ''}${hero.drawnTotal.targets.toString()}`] : []
            )
            .concat(hero.drawnTotal?.effects ? hero.drawnTotal.effects : [])
            .join(' ')}
        </Text>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 96,
            flexDirection: 'row',
            width: width,
            justifyContent: 'space-around',
            alignItems: 'stretch',
          }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => this.onAddBless(hero)}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>Bless</Text>
            <Text style={{ textAlign: 'center' }}>{hero.blessesTotal}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={() => this.onAddCurse(hero)}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>Curse</Text>
            <Text style={{ textAlign: 'center' }}>{hero.cursesTotal}</Text>
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
  null,
  null,
  { forwardRef: true }
)(HeroView);
