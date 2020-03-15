import { zero, one, nOne, double, nTwo, two, noDmg, curse, bless } from 'assets/images/modifiers/base';
import { ModifierEffect } from './models/ModifierEffect';
import { Modifier } from './models/Modifier';

const StandardModifiers: {
  Zero: Modifier;
  One: Modifier;
  MinusOne: Modifier;
  Two: Modifier;
  MinusTwo: Modifier;
  Double: Modifier;
  NoDamage: Modifier;
  Curse: Modifier;
  Bless: Modifier;
} = {
  Zero: { image: zero, attack: 0 },
  One: { image: one, attack: 1 },
  MinusOne: { image: nOne, attack: -1 },
  Two: { image: two, attack: 2 },
  MinusTwo: { image: nTwo, attack: -2 },
  Double: { image: double, shuffle: true, effects: [ModifierEffect.Double] },
  NoDamage: { image: noDmg, shuffle: true, effects: [ModifierEffect.NoAttack] },
  Curse: { image: curse, effects: [ModifierEffect.Double] },
  Bless: { image: bless, effects: [ModifierEffect.NoAttack] },
};

export default StandardModifiers;
