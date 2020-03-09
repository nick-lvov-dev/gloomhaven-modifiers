import { HeroClass } from '../HeroClass';
import { ClassUpgrade } from './models/ClassUpgrade';
import TinkererUpdgrades from './TinkererUpdgrades';

const ClassUpgrades: { [key in keyof typeof HeroClass]: { [key: string]: ClassUpgrade } } = {
  Tinkerer: TinkererUpdgrades,
  Scoundrel: {},
  Monsters: {},
};

export default ClassUpgrades;
