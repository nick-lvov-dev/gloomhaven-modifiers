import * as baseModifiers from 'src/core/images/modifiers/base';
import { ModifierEffect } from './models/ModifierEffect';
import { Modifier } from './models/Modifier';
import { nameof } from 'src/common/helpers/nameof.helper';

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
  ExtraNOne: Modifier;
} = {
  Zero: Object.freeze({ id: nameof<typeof baseModifiers>('zero'), image: baseModifiers.zero, attack: 0 }),
  One: Object.freeze({ id: nameof<typeof baseModifiers>('one'), image: baseModifiers.one, attack: 1 }),
  MinusOne: Object.freeze({ id: nameof<typeof baseModifiers>('nOne'), image: baseModifiers.nOne, attack: -1 }),
  Two: Object.freeze({ id: nameof<typeof baseModifiers>('two'), image: baseModifiers.two, attack: 2 }),
  MinusTwo: Object.freeze({ id: nameof<typeof baseModifiers>('nTwo'), image: baseModifiers.nTwo, attack: -2 }),
  Double: Object.freeze({
    id: nameof<typeof baseModifiers>('double'),
    image: baseModifiers.double,
    shuffle: true,
    effects: [ModifierEffect.Double],
  }),
  NoDamage: Object.freeze({
    id: nameof<typeof baseModifiers>('noDmg'),
    image: baseModifiers.noDmg,
    shuffle: true,
    effects: [ModifierEffect.NoAttack],
  }),
  Curse: Object.freeze({ id: nameof<typeof baseModifiers>('curse'), image: baseModifiers.curse, effects: [ModifierEffect.NoAttack] }),
  Bless: Object.freeze({ id: nameof<typeof baseModifiers>('bless'), image: baseModifiers.bless, effects: [ModifierEffect.Double] }),
  ExtraNOne: Object.freeze({ id: nameof<typeof baseModifiers>('extraNOne'), image: baseModifiers.extraNOne, attack: -1 }),
};

export default Object.freeze(StandardModifiers);
