import { HeroClass } from '../HeroClass';
import { Modifier } from './models/Modifier';
import TinkererModifiers from './TinkererModifiers';
import ScoundrelModifiers from './ScoundrelModifiers';
import MonsterModifiers from './MonsterModifiers';

const ClassModifiers: { [key in keyof typeof HeroClass]: { [key: string]: Modifier } } = {
  Tinkerer: TinkererModifiers,
  Scoundrel: ScoundrelModifiers,
  Monsters: MonsterModifiers,
};

export default ClassModifiers;
