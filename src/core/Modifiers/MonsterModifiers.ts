import * as monsterModifiers from 'src/core/images/modifiers/monsters';
import { ModifierEffect } from './models/ModifierEffect';
import { Modifier } from './models/Modifier';
import { nameof } from 'src/common/helpers/nameof.helper';

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
  Zero: Object.freeze({ id: nameof<typeof monsterModifiers>('monsterZero'), image: monsterModifiers.monsterZero, attack: 0 }),
  One: Object.freeze({ id: nameof<typeof monsterModifiers>('monsterOne'), image: monsterModifiers.monsterOne, attack: 1 }),
  MinusOne: Object.freeze({ id: nameof<typeof monsterModifiers>('monsterNOne'), image: monsterModifiers.monsterNOne, attack: -1 }),
  Two: Object.freeze({ id: nameof<typeof monsterModifiers>('monsterTwo'), image: monsterModifiers.monsterTwo, attack: 2 }),
  MinusTwo: Object.freeze({ id: nameof<typeof monsterModifiers>('monsterNTwo'), image: monsterModifiers.monsterNTwo, attack: -2 }),
  Double: Object.freeze({
    id: nameof<typeof monsterModifiers>('monsterDouble'),
    image: monsterModifiers.monsterDouble,
    shuffle: true,
    effects: [ModifierEffect.Double],
  }),
  NoDamage: Object.freeze({
    id: nameof<typeof monsterModifiers>('monsterEmpty'),
    image: monsterModifiers.monsterEmpty,
    shuffle: true,
    effects: [ModifierEffect.NoAttack],
  }),
  Curse: Object.freeze({ id: nameof<typeof monsterModifiers>('monsterCurse'), image: monsterModifiers.monsterCurse, effects: [ModifierEffect.NoAttack] }),
};

export default Object.freeze(MonsterModifiers);
