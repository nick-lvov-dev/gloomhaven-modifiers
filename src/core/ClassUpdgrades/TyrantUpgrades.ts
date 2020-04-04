import { ClassUpgrade } from './models/ClassUpgrade';
import StandardModifiers from '../Modifiers/StandardModifiers';
import TyrantModifiers from '../Modifiers/TyrantModifiers';

const TyrantUpdgrades: {
  RemoveTwoMinusOne: ClassUpgrade;
  ReplaceMinusOneWithOne: ClassUpgrade;
  ReplaceZeroWithTwo: ClassUpgrade;
  AddOneOneWound: ClassUpgrade;
  AddOneOneImmobilize: ClassUpgrade;
  AddTwoHealNext: ClassUpgrade;
  AddTwoEarthNext: ClassUpgrade;
} = {
  RemoveTwoMinusOne: Object.freeze(new ClassUpgrade(null, 2, 'Remove two -1', { subModifier: StandardModifiers.MinusOne })),
  ReplaceMinusOneWithOne: Object.freeze(
    new ClassUpgrade(TyrantModifiers.One, 1, 'Replace -1 with 1', {
      limit: 3,
      subModifier: StandardModifiers.MinusOne,
    })
  ),
  ReplaceZeroWithTwo: Object.freeze(
    new ClassUpgrade(TyrantModifiers.Two, 1, 'Replace 0 with 2', { limit: 2, subModifier: StandardModifiers.Zero })
  ),
  AddOneOneWound: Object.freeze(new ClassUpgrade(TyrantModifiers.OneWound, 1, 'Add one +1 Wound', { limit: 2 })),
  AddOneOneImmobilize: Object.freeze(new ClassUpgrade(TyrantModifiers.OneImmobilize, 1, 'Add one +1 Immobilize', { limit: 2 })),
  AddTwoHealNext: Object.freeze(new ClassUpgrade(TyrantModifiers.HealNext, 2, 'Add two Heal 1 Next', { limit: 3 })),
  AddTwoEarthNext: Object.freeze(new ClassUpgrade(TyrantModifiers.EarthNext, 2, 'Add two Earth Next')),
};

export default Object.freeze(TyrantUpdgrades);
