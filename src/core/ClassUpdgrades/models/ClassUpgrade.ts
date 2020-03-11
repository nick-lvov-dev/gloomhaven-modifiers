import { Modifier } from 'src/core/Modifiers/models/Modifier';

export interface ClassUpgradeOptions {
  limit?: number;
  subModifier?: Modifier;
}

export class ClassUpgrade {
  constructor(public modifier: Modifier | null, public count: number, public name: string, options?: ClassUpgradeOptions) {
    if (options) {
      if (options.limit) this.limit = options.limit;
      if (options.subModifier) this.subModifier = options.subModifier;
    }
  }

  subModifier?: Modifier;
  limit = 1;
}
