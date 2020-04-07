import { ClassUpgrade } from './models/ClassUpgrade';
import StandardModifiers from '../Modifiers/StandardModifiers';
import ScoundrelModifiers from '../Modifiers/ScoundrelModifiers';

const ScoundrelUpdgrades: {
  RemoveTwoMinusOne: ClassUpgrade;
  RemoveFourZero: ClassUpgrade;
  ReplaceMinusTwoWithZero: ClassUpgrade;
  ReplaceMinusOneWithOne: ClassUpgrade;
  ReplaceZeroWithTwo: ClassUpgrade;
  AddTwoPierceNext: ClassUpgrade;
  AddTwoOneNext: ClassUpgrade;
  AddTwoPoisonNext: ClassUpgrade;
  AddTwoMuddleNext: ClassUpgrade;
  AddOneInvisibleNext: ClassUpgrade;
} = {
  RemoveTwoMinusOne: Object.freeze(new ClassUpgrade(null, 2, 'Remove two -1', { limit: 2, subModifier: StandardModifiers.MinusOne })),
  RemoveFourZero: Object.freeze(new ClassUpgrade(null, 4, 'Remove four 0', { subModifier: StandardModifiers.Zero })),
  ReplaceMinusTwoWithZero: Object.freeze(new ClassUpgrade(ScoundrelModifiers.Zero, 1, 'Replace -2 with 0', { subModifier: StandardModifiers.MinusTwo })),
  ReplaceMinusOneWithOne: Object.freeze(new ClassUpgrade(ScoundrelModifiers.One, 1, 'Replace -1 with 1', { subModifier: StandardModifiers.MinusOne })),
  ReplaceZeroWithTwo: Object.freeze(new ClassUpgrade(ScoundrelModifiers.Two, 1, 'Replace 0 with 2', { limit: 2, subModifier: StandardModifiers.Zero })),
  AddTwoOneNext: Object.freeze(new ClassUpgrade(ScoundrelModifiers.OneNext, 2, 'Add two +1 next', { limit: 2 })),
  AddTwoPierceNext: Object.freeze(new ClassUpgrade(ScoundrelModifiers.PierceNext, 2, 'Add two Pierce next')),
  AddTwoPoisonNext: Object.freeze(new ClassUpgrade(ScoundrelModifiers.PoisonNext, 2, 'Add two Poison next', { limit: 2 })),
  AddTwoMuddleNext: Object.freeze(new ClassUpgrade(ScoundrelModifiers.MuddleNext, 2, 'Add two Muddle next')),
  AddOneInvisibleNext: Object.freeze(new ClassUpgrade(ScoundrelModifiers.InvisibilityNext, 1, 'Add one Invisibility next')),
};

export default Object.freeze(ScoundrelUpdgrades);
