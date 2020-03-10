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
  RemoveTwoMinusOne: new ClassUpgrade(null, 2, 'Remove two -1', { limit: 2, subModifier: StandardModifiers.MinusOne }),
  RemoveFourZero: new ClassUpgrade(null, 4, 'Remove four 0', { subModifier: StandardModifiers.Zero }),
  ReplaceMinusTwoWithZero: new ClassUpgrade(ScoundrelModifiers.Zero, 1, 'Replace -2 with 0', { subModifier: StandardModifiers.MinusTwo }),
  ReplaceMinusOneWithOne: new ClassUpgrade(ScoundrelModifiers.One, 1, 'Replace -1 with 1', { subModifier: StandardModifiers.MinusOne }),
  ReplaceZeroWithTwo: new ClassUpgrade(ScoundrelModifiers.Two, 1, 'Replace 0 with 2', { limit: 2, subModifier: StandardModifiers.Zero }),
  AddTwoOneNext: new ClassUpgrade(ScoundrelModifiers.OneNext, 2, 'Add two +1 next', { limit: 2 }),
  AddTwoPierceNext: new ClassUpgrade(ScoundrelModifiers.PierceNext, 2, 'Add two Pierce next'),
  AddTwoPoisonNext: new ClassUpgrade(ScoundrelModifiers.PoisonNext, 2, 'Add two Poison next', { limit: 2 }),
  AddTwoMuddleNext: new ClassUpgrade(ScoundrelModifiers.MuddleNext, 2, 'Add two Muddle next'),
  AddOneInvisibleNext: new ClassUpgrade(ScoundrelModifiers.InvisibilityNext, 2, 'Add one Invisibility next'),
};

export default ScoundrelUpdgrades;
