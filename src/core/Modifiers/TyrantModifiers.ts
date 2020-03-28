import * as tyrantModifiers from 'src/core/images/modifiers/tyrant';
import { Modifier } from './models/Modifier';
import { ModifierEffect } from './models/ModifierEffect';
import { nameof } from 'src/common/helpers/nameof.helper';

const TyrantModifiers: {
  One: Modifier;
  Two: Modifier;
  OneWound: Modifier;
  OneImmobilize: Modifier;
  HealNext: Modifier;
  EarthNext: Modifier;
} = {
  One: { id: nameof<typeof tyrantModifiers>('tyrantOne'), image: tyrantModifiers.tyrantOne, attack: 1 },
  Two: { id: nameof<typeof tyrantModifiers>('tyrantTwo'), image: tyrantModifiers.tyrantTwo, attack: 2 },
  OneWound: {
    id: nameof<typeof tyrantModifiers>('tyrantOneWound'),
    image: tyrantModifiers.tyrantOneWound,
    attack: 1,
    effects: [ModifierEffect.Wound],
  },
  OneImmobilize: {
    id: nameof<typeof tyrantModifiers>('tyrantOneImmobilize'),
    image: tyrantModifiers.tyrantOneImmobilize,
    attack: 1,
    effects: [ModifierEffect.Immobilize],
  },
  HealNext: {
    id: nameof<typeof tyrantModifiers>('tyrantHealNext'),
    image: tyrantModifiers.tyrantHealNext,
    next: true,
    heal: 1,
  },
  EarthNext: {
    id: nameof<typeof tyrantModifiers>('tyrantEarthNext'),
    image: tyrantModifiers.tyrantEarthNext,
    next: true,
    effects: [ModifierEffect.Earth],
  },
};

export default TyrantModifiers;
