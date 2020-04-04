import { ClassUpgrade } from './models/ClassUpgrade';
import TinkererModifiers from '../Modifiers/TinkererModifiers';
import StandardModifiers from '../Modifiers/StandardModifiers';

const TinkererUpdgrades: {
  RemoveTwoMinusOne: ClassUpgrade;
  ReplaceMinusTwoWithZero: ClassUpgrade;
  AddTwoOnes: ClassUpgrade;
  AddOneThree: ClassUpgrade;
  AddTwoFireNext: ClassUpgrade;
  AddThreeMuddleNext: ClassUpgrade;
  AddOneOneWound: ClassUpgrade;
  AddOneOneImmobilize: ClassUpgrade;
  AddOneOneHeal: ClassUpgrade;
  AddOneTarget: ClassUpgrade;
} = {
  RemoveTwoMinusOne: Object.freeze(new ClassUpgrade(null, 2, 'Remove two -1', { limit: 2, subModifier: StandardModifiers.MinusOne })),
  ReplaceMinusTwoWithZero: Object.freeze(new ClassUpgrade(TinkererModifiers.Zero, 1, 'Replace -2 with 0', { subModifier: StandardModifiers.MinusTwo })),
  AddTwoOnes: Object.freeze(new ClassUpgrade(TinkererModifiers.One, 2, 'Add two +1')),
  AddOneThree: Object.freeze(new ClassUpgrade(TinkererModifiers.Three, 1, 'Add one +3')),
  AddTwoFireNext: Object.freeze(new ClassUpgrade(TinkererModifiers.FireNext, 2, 'Add two Fire Next')),
  AddThreeMuddleNext: Object.freeze(new ClassUpgrade(TinkererModifiers.MuddleNext, 3, 'Add three Muddle Next')),
  AddOneOneWound: Object.freeze(new ClassUpgrade(TinkererModifiers.OneWound, 1, 'Add one +1 Wound', { limit: 2 })),
  AddOneOneImmobilize: Object.freeze(new ClassUpgrade(TinkererModifiers.OneImmobilize, 1, 'Add one +1 Immobilize', { limit: 2 })),
  AddOneOneHeal: Object.freeze(new ClassUpgrade(TinkererModifiers.OneHeal, 1, 'Add one +1 Heal', { limit: 2 })),
  AddOneTarget: Object.freeze(new ClassUpgrade(TinkererModifiers.Target, 1, 'Add one +Target')),
};

export default Object.freeze(TinkererUpdgrades);
