import * as tinkererModifiers from 'src/core/images/modifiers/tinkerer';
import { Modifier } from './models/Modifier';
import { ModifierEffect } from './models/ModifierEffect';
import { nameof } from 'src/common/helpers/nameof.helper';

const TinkererModifiers: {
  Zero: Modifier;
  One: Modifier;
  Three: Modifier;
  Target: Modifier;
  OneWound: Modifier;
  OneImmobilize: Modifier;
  OneHeal: Modifier;
  FireNext: Modifier;
  MuddleNext: Modifier;
} = {
  Zero: Object.freeze({ id: nameof<typeof tinkererModifiers>('tinkererZero'), image: tinkererModifiers.tinkererZero, attack: 0 }),
  One: Object.freeze({ id: nameof<typeof tinkererModifiers>('tinkererOne'), image: tinkererModifiers.tinkererOne, attack: 1 }),
  Three: Object.freeze({ id: nameof<typeof tinkererModifiers>('tinkererThree'), image: tinkererModifiers.tinkererThree, attack: 3 }),
  Target: Object.freeze({ id: nameof<typeof tinkererModifiers>('tinkererTarget'), image: tinkererModifiers.tinkererTarget, targets: 1 }),
  OneWound: Object.freeze({
    id: nameof<typeof tinkererModifiers>('tinkererOneWound'),
    image: tinkererModifiers.tinkererOneWound,
    attack: 1,
    effects: [ModifierEffect.Wound],
  }),
  OneImmobilize: Object.freeze({
    id: nameof<typeof tinkererModifiers>('tinkererOneImmobilize'),
    image: tinkererModifiers.tinkererOneImmobilize,
    attack: 1,
    effects: [ModifierEffect.Immobilize],
  }),
  OneHeal: Object.freeze({
    id: nameof<typeof tinkererModifiers>('tinkererOneHeal'),
    image: tinkererModifiers.tinkererOneHeal,
    attack: 1,
    heal: 2,
  }),
  FireNext: Object.freeze({
    id: nameof<typeof tinkererModifiers>('tinkererFireNext'),
    image: tinkererModifiers.tinkererFireNext,
    next: true,
    effects: [ModifierEffect.Fire],
  }),
  MuddleNext: Object.freeze({
    id: nameof<typeof tinkererModifiers>('tinkererMuddleNext'),
    image: tinkererModifiers.tinkererMuddleNext,
    next: true,
    effects: [ModifierEffect.Muddle],
  }),
};

export default Object.freeze(TinkererModifiers);
