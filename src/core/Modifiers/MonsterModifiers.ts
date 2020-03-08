import {
  monsterZero,
  monsterOne,
  monsterNOne,
  monsterTwo,
  monsterNTwo,
  monsterDouble,
  monsterEmpty,
  monsterCurse,
} from 'assets/images/modifiers/monster';
import { ModifierEffect } from './models/ModifierEffect';
import { Modifier } from './models/Modifier';

const MonsterModifiers: {
  Zero: Modifier;
  One: Modifier;
  MinusOne: Modifier;
  Two: Modifier;
  MinusTwo: Modifier;
  Double: Modifier;
  NoDamage: Modifier;
  Curse: Modifier;
} = {
  Zero: { image: monsterZero, attack: 0 },
  One: { image: monsterOne, attack: 0 },
  MinusOne: { image: monsterNOne, attack: -1 },
  Two: { image: monsterTwo, attack: 2 },
  MinusTwo: { image: monsterNTwo, attack: -2 },
  Double: { image: monsterDouble, shuffle: true, effects: [ModifierEffect.Double] },
  NoDamage: { image: monsterEmpty, shuffle: true, effects: [ModifierEffect.NoAttack] },
  Curse: { image: monsterCurse, effects: [ModifierEffect.Double] },
};

export default MonsterModifiers;
