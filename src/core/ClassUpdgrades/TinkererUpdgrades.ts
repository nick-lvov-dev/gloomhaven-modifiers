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
  RemoveTwoMinusOne: new ClassUpgrade(StandardModifiers.MinusOne, -2, 'Remove two -1', { limit: 2 }),
  ReplaceMinusTwoWithZero: new ClassUpgrade(StandardModifiers.Zero, 1, 'Replace -2 with 0', { subModifier: StandardModifiers.MinusTwo }),
  AddTwoOnes: new ClassUpgrade(StandardModifiers.One, 2, 'Add two +1'),
  AddOneThree: new ClassUpgrade(TinkererModifiers.Three, 1, 'Add one +3'),
  AddTwoFireNext: new ClassUpgrade(TinkererModifiers.FireNext, 2, 'Add two Fire Next'),
  AddThreeMuddleNext: new ClassUpgrade(TinkererModifiers.MuddleNext, 3, 'Add three Muddle Next'),
  AddOneOneWound: new ClassUpgrade(TinkererModifiers.OneWound, 1, 'Add one +1 Wound', { limit: 2 }),
  AddOneOneImmobilize: new ClassUpgrade(TinkererModifiers.OneImmobilize, 1, 'Add one +1 Immobilize', { limit: 2 }),
  AddOneOneHeal: new ClassUpgrade(TinkererModifiers.OneHeal, 1, 'Add one +1 Heal', { limit: 2 }),
  AddOneTarget: new ClassUpgrade(TinkererModifiers.Target, 1, 'Add one +Target'),
};
