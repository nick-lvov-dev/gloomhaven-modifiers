import { HeroClass } from '../HeroClass';
import { ClassUpgrade } from './models/ClassUpgrade';
import TinkererUpdgrades from './TinkererUpdgrades';
import ScoundrelUpgrades from './ScoundrelUpgrades';

const ClassUpgrades: { [key in keyof typeof HeroClass]: { [key: string]: ClassUpgrade } } = {
  Tinkerer: TinkererUpdgrades,
  Scoundrel: ScoundrelUpgrades,
  Monsters: {},
};

export default ClassUpgrades;
