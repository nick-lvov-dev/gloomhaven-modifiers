import * as berserkModifiers from 'src/core/images/modifiers/berserk';
import { Modifier } from './models/Modifier';
import { ModifierEffect } from './models/ModifierEffect';
import { nameof } from 'src/common/helpers/nameof.helper';

const BerserkModifiers: {
  HealOneNext: Modifier;
  One: Modifier;
  OneDisarmNext: Modifier;
  StunNext: Modifier;
  TwoFire: Modifier;
  TwoNext: Modifier;
  WoundNext: Modifier;
} = {
  HealOneNext: Object.freeze({
    id: nameof<typeof berserkModifiers>('berserkHealOneNext'),
    image: berserkModifiers.berserkHealOneNext,
    heal: 1,
    next: true,
  }),
  One: Object.freeze({ id: nameof<typeof berserkModifiers>('berserkOne'), image: berserkModifiers.berserkOne, attack: 1 }),
  OneDisarmNext: Object.freeze({
    id: nameof<typeof berserkModifiers>('berserkOneDisarmNext'),
    image: berserkModifiers.berserkOneDisarmNext,
    attack: 1,
    effects: [ModifierEffect.Disarm],
    next: true,
  }),
  StunNext: Object.freeze({
    id: nameof<typeof berserkModifiers>('berserkStunNext'),
    image: berserkModifiers.berserkStunNext,
    effects: [ModifierEffect.Stun],
    next: true,
  }),
  TwoFire: Object.freeze({
    id: nameof<typeof berserkModifiers>('berserkTwoFire'),
    image: berserkModifiers.berserkTwoFire,
    attack: 2,
    effects: [ModifierEffect.Fire],
  }),
  TwoNext: Object.freeze({
    id: nameof<typeof berserkModifiers>('berserkTwoNext'),
    image: berserkModifiers.berserkTwoNext,
    attack: 2,
    next: true,
  }),
  WoundNext: Object.freeze({
    id: nameof<typeof berserkModifiers>('berserkWoundNext'),
    image: berserkModifiers.berserkWoundNext,
    next: true,
    effects: [ModifierEffect.Wound],
  }),
};

export default Object.freeze(BerserkModifiers);
