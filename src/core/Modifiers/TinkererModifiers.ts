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
  Zero: { id: nameof<typeof tinkererModifiers>('tinkererZero'), image: tinkererModifiers.tinkererZero, attack: 0 },
  One: { id: nameof<typeof tinkererModifiers>('tinkererOne'), image: tinkererModifiers.tinkererOne, attack: 1 },
  Three: { id: nameof<typeof tinkererModifiers>('tinkererThree'), image: tinkererModifiers.tinkererThree, attack: 3 },
  Target: { id: nameof<typeof tinkererModifiers>('tinkererTarget'), image: tinkererModifiers.tinkererTarget, targets: 1 },
  OneWound: {
    id: nameof<typeof tinkererModifiers>('tinkererOneWound'),
    image: tinkererModifiers.tinkererOneWound,
    attack: 1,
    effects: [ModifierEffect.Wound],
  },
  OneImmobilize: {
    id: nameof<typeof tinkererModifiers>('tinkererOneImmobilize'),
    image: tinkererModifiers.tinkererOneImmobilize,
    attack: 1,
    effects: [ModifierEffect.Immobilize],
  },
  OneHeal: { id: nameof<typeof tinkererModifiers>('tinkererOneHeal'), image: tinkererModifiers.tinkererOneHeal, attack: 1, heal: 2 },
  FireNext: {
    id: nameof<typeof tinkererModifiers>('tinkererFireNext'),
    image: tinkererModifiers.tinkererFireNext,
    next: true,
    effects: [ModifierEffect.Fire],
  },
  MuddleNext: {
    id: nameof<typeof tinkererModifiers>('tinkererMuddleNext'),
    image: tinkererModifiers.tinkererMuddleNext,
    next: true,
    effects: [ModifierEffect.Muddle],
  },
};

export default TinkererModifiers;
