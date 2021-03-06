import { Modifier } from './models/Modifier';
import { ModifierEffect } from './models/ModifierEffect';
import * as scoundrelModifiers from 'src/core/images/modifiers/scoundrel';
import { nameof } from 'src/common/helpers/nameof.helper';

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
  Zero: Object.freeze({ id: nameof<typeof scoundrelModifiers>('scoundrelZero'), image: scoundrelModifiers.scoundrelZero, attack: 0 }),
  One: Object.freeze({ id: nameof<typeof scoundrelModifiers>('scoundrelOne'), image: scoundrelModifiers.scoundrelOne, attack: 1 }),
  Two: Object.freeze({ id: nameof<typeof scoundrelModifiers>('scoundrelTwo'), image: scoundrelModifiers.scoundrelTwo, attack: 2 }),
  OneNext: Object.freeze({ id: nameof<typeof scoundrelModifiers>('scoundrelOneNext'), image: scoundrelModifiers.scoundrelOneNext, attack: 1, next: true }),
  MuddleNext: Object.freeze({
    id: nameof<typeof scoundrelModifiers>('scoundrelMuddleNext'),
    image: scoundrelModifiers.scoundrelMuddleNext,
    next: true,
    effects: [ModifierEffect.Muddle],
  }),
  PierceNext: Object.freeze({
    id: nameof<typeof scoundrelModifiers>('scoundrelPierceNext'),
    image: scoundrelModifiers.scoundrelPierceNext,
    next: true,
    pierce: 3,
  }),
  PoisonNext: Object.freeze({
    id: nameof<typeof scoundrelModifiers>('scoundrelPoisonNext'),
    image: scoundrelModifiers.scoundrelPoisonNext,
    next: true,
    effects: [ModifierEffect.Poison],
  }),
  InvisibilityNext: Object.freeze({
    id: nameof<typeof scoundrelModifiers>('scoundrelInvisibilityNext'),
    image: scoundrelModifiers.scoundrelInvisibilityNext,
    next: true,
    effects: [ModifierEffect.Invisible],
  }),
};

export default Object.freeze(ScoundrelModifiers);
