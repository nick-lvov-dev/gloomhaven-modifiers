import { HeroClass } from '../HeroClass';
import { ClassUpgrade } from './models/ClassUpgrade';
import TinkererUpdgrades from './TinkererUpgrades';
import ScoundrelUpgrades from './ScoundrelUpgrades';
import TyrantUpdgrades from './TyrantUpgrades';
import BerserkUpdgrades from './BeserkUpgrades';

const ClassUpgrades: { [key in HeroClass]: { [key: string]: ClassUpgrade } } = {
  Tinkerer: TinkererUpdgrades,
  Scoundrel: ScoundrelUpgrades,
  Tyrant: TyrantUpdgrades,
  Berserk: BerserkUpdgrades,
  Monsters: {},
};

export default ClassUpgrades;
