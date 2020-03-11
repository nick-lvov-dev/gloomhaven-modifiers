import { Modifier } from './models/Modifier';
import { ModifierEffect } from './models/ModifierEffect';
import {
  scoundrelZero,
  scoundrelOne,
  scoundrelTwo,
  scoundrelOneNext,
  scoundrelMuddleNext,
  scoundrelPierceNext,
  scoundrelPoisonNext,
  scoundrelInvisibilityNext,
} from 'assets/images/modifiers/scoundrel';

const ScoundrelModifiers: {
  Zero: Modifier;
  One: Modifier;
  Two: Modifier;
  OneNext: Modifier;
  PierceNext: Modifier;
  PoisonNext: Modifier;
  MuddleNext: Modifier;
  InvisibilityNext: Modifier;
} = {
  Zero: { image: scoundrelZero, attack: 0 },
  One: { image: scoundrelOne, attack: 1 },
  Two: { image: scoundrelTwo, attack: 2 },
  OneNext: { image: scoundrelOneNext, attack: 1, next: true },
  MuddleNext: { image: scoundrelMuddleNext, next: true, effects: [ModifierEffect.Muddle] },
  PierceNext: { image: scoundrelPierceNext, next: true, pierce: 3 },
  PoisonNext: { image: scoundrelPoisonNext, next: true, effects: [ModifierEffect.Poison] },
  InvisibilityNext: { image: scoundrelInvisibilityNext, next: true, effects: [ModifierEffect.Invisible] },
};

export default ScoundrelModifiers;
