import { HeroClass } from '../HeroClass';
import { Modifier } from './models/Modifier';
import TinkererModifiers from './TinkererModifiers';
import ScoundrelModifiers from './ScoundrelModifiers';
import MonsterModifiers from './MonsterModifiers';
import TyrantModifiers from './TyrantModifiers';

const ClassModifiers: { [key in HeroClass]: { [key: string]: Modifier } } = {
  Tinkerer: TinkererModifiers,
  Scoundrel: ScoundrelModifiers,
  Monsters: MonsterModifiers,
  Tyrant: TyrantModifiers,
};

export default ClassModifiers;
