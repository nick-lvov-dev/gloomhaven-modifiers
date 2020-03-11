import { ModifierEffect } from './ModifierEffect';

export interface Modifier {
  image: any;
  attack?: number;
  heal?: number;
  pierce?: number;
  targets?: number;
  shuffle?: boolean;
  next?: boolean;
  effects?: ModifierEffect[];
}
