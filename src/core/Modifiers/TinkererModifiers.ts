import {
  tinkererZero,
  tinkererOne,
  tinkererTarget,
  tinkererOneWound,
  tinkererOneImmobilize,
  tinkererOneHeal,
  tinkererFireNext,
  tinkererMuddleNext,
  tinkererThree,
} from 'assets/images/modifiers/tinkerer';
import { Modifier } from './models/Modifier';
import { ModifierEffect } from './models/ModifierEffect';

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
  Zero: { image: tinkererZero, attack: 0 },
  One: { image: tinkererOne, attack: 1 },
  Three: { image: tinkererThree, attack: 3 },
  Target: { image: tinkererTarget, targets: 1 },
  OneWound: { image: tinkererOneWound, attack: 1 },
  OneImmobilize: { image: tinkererOneImmobilize, attack: 1 },
  OneHeal: { image: tinkererOneHeal, attack: 1, heal: 2 },
  FireNext: { image: tinkererFireNext, next: true, effects: [ModifierEffect.Fire] },
  MuddleNext: { image: tinkererMuddleNext, next: true, effects: [ModifierEffect.Muddle] },
};

export default TinkererModifiers;
