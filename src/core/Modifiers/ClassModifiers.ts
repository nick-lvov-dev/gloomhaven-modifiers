import { HeroClass } from '../HeroClass';
import { Modifier } from './models/Modifier';
import TinkererModifiers from './TinkererModifiers';
import ScoundrelModifiers from './ScoundrelModifiers';
import MonsterModifiers from './MonsterModifiers';
import TyrantModifiers from './TyrantModifiers';
import BerserkModifiers from './BerserkModifiers';

const ClassModifiers: { [key in HeroClass]: { [key: string]: Modifier } } = {
  Tinkerer: TinkererModifiers,
  Scoundrel: ScoundrelModifiers,
  Monsters: MonsterModifiers,
  Tyrant: TyrantModifiers,
  Berserk: BerserkModifiers,
};

export default ClassModifiers;
