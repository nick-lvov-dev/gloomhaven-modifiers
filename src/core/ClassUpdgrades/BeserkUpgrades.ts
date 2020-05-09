import { ClassUpgrade } from './models/ClassUpgrade';
import StandardModifiers from '../Modifiers/StandardModifiers';
import BerserkModifiers from '../Modifiers/BerserkModifiers';

const BerserkUpdgrades: {
  RemoveTwoMinusOne: ClassUpgrade;
  RemoveFourZero: ClassUpgrade;
  ReplaceMinusOneWithOne: ClassUpgrade;
  ReplaceZeroWithTwoNext: ClassUpgrade;
  AddTwoWoundNext: ClassUpgrade;
  AddOneStunNext: ClassUpgrade;
  AddOneOneDisarmNext: ClassUpgrade;
  AddTwoHealOneNext: ClassUpgrade;
  AddOneTwoFire: ClassUpgrade;
} = {
  RemoveTwoMinusOne: Object.freeze(new ClassUpgrade(null, 2, 'Remove two -1', { subModifier: StandardModifiers.MinusOne })),
  RemoveFourZero: Object.freeze(new ClassUpgrade(null, 4, 'Remove four 0', { subModifier: StandardModifiers.Zero })),
  ReplaceMinusOneWithOne: Object.freeze(
    new ClassUpgrade(BerserkModifiers.One, 1, 'Replace -1 with 1', {
      limit: 2,
      subModifier: StandardModifiers.MinusOne,
    })
  ),
  ReplaceZeroWithTwoNext: Object.freeze(
    new ClassUpgrade(BerserkModifiers.TwoNext, 1, 'Replace 0 with 2 next', {
      limit: 2,
      subModifier: StandardModifiers.Zero,
    })
  ),
  AddTwoWoundNext: Object.freeze(new ClassUpgrade(BerserkModifiers.WoundNext, 2, 'Add two Wound next', { limit: 2 })),
  AddOneStunNext: Object.freeze(new ClassUpgrade(BerserkModifiers.StunNext, 1, 'Add one Stun next', { limit: 2 })),
  AddOneOneDisarmNext: Object.freeze(new ClassUpgrade(BerserkModifiers.OneDisarmNext, 1, 'Add one +1 Disarm next')),
  AddTwoHealOneNext: Object.freeze(new ClassUpgrade(BerserkModifiers.HealOneNext, 2, 'Add two Heal 1 Next')),
  AddOneTwoFire: Object.freeze(new ClassUpgrade(BerserkModifiers.TwoFire, 1, 'Add one +2 Fire', { limit: 2 })),
};

export default Object.freeze(BerserkUpdgrades);
