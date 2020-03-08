import { Modifier } from '../Modifiers/models/Modifier';
import { ClassUpgrade } from '../ClassUpdgrades/models/ClassUpgrade';
import { HeroClass } from '../HeroClass';
import { cloneDeep } from 'lodash';
import random from 'src/common/random';
import StandardModifiers from '../Modifiers/StandardModifiers';

interface HeroOptions {
  currentModifiers?: Modifier[];
  remainingModifiers?: Modifier[];
  drawn?: Modifier[];
  upgrades?: ClassUpgrade[];
}

export class Hero {
  private _defaultModifiers: Modifier[];
  private _currentModifiers: Modifier[] = [...this._defaultModifiers];
  private _remainingModifiers: Modifier[] = [...this._defaultModifiers];
  private _drawn: Modifier[] = [];
  private _upgrades: ClassUpgrade[] = [];

  constructor(
    public readonly heroClass: keyof typeof HeroClass,
    public readonly name: string,
    defaultModifiers: Modifier[] = [],
    options?: HeroOptions
  ) {
    this._defaultModifiers = defaultModifiers;
    if (options) {
      if (options.currentModifiers) this._currentModifiers = [...options.currentModifiers];
      if (options.remainingModifiers) this._remainingModifiers = [...options.remainingModifiers];
      if (options.drawn) this._drawn = [...options.drawn];
      if (options.upgrades) this._upgrades = cloneDeep(options.upgrades);
    }
  }

  get defaultModifiers() {
    return this._defaultModifiers;
  }

  get currentModifiers() {
    return this._currentModifiers;
  }

  get remainingModifiers() {
    return this._remainingModifiers;
  }

  get drawn() {
    return this._drawn;
  }

  get upgrades() {
    return this._upgrades;
  }

  get lastDrawn() {
    if (!this.drawn.length) return;

    const total: Modifier = this.drawn.slice(-1)[0];
    total.attack = total.attack ?? 0;
    total.heal = total.heal ?? 0;
    total.targets = total.targets ?? 0;
    total.effects = total.effects ?? [];
    let i = 2;
    while (i <= this.drawn.length && this.drawn.slice(-i)[0].next) {
      const mod = this.drawn.slice(-i)[0];
      total.attack += mod.attack ?? 0;
      total.heal += mod.heal ?? 0;
      total.targets += mod.targets ?? 0;
      total.effects = total.effects?.concat(mod.effects ?? []);
    }

    return total;
  }

  draw = () => {
    if (!this.lastDrawn?.next && this.lastDrawn?.shuffle) this.shuffle();

    const index = random(this.remainingModifiers.length);
    const modifier = this.remainingModifiers[index];
    this.drawn.push(modifier);
    if ([StandardModifiers.Curse.image, StandardModifiers.Bless.image].includes(modifier.image)) this.removeModifier(modifier);
    this.remainingModifiers.splice(index, 1);
  };

  shuffle = (clean = false) => {
    if (clean) this._currentModifiers = [...this.defaultModifiers];
    this._remainingModifiers = [...this._currentModifiers];
    this._drawn = [];
  };

  addCurse = () => {
    this._currentModifiers.push(StandardModifiers.Curse);
    this.shuffle();
  };

  addBless = () => {
    this._currentModifiers.push(StandardModifiers.Bless);
    this.shuffle();
  };

  addUpgrade = (upgrade: ClassUpgrade) => {
    if (this._upgrades.filter(x => x.name === upgrade.name).length === upgrade.limit) return;

    for (let i = 0; i < upgrade.count; i++) {
      this.defaultModifiers.push(upgrade.modifier);
    }

    if (upgrade.subModifier) this.removeModifier(upgrade.subModifier, true, upgrade.count);
    this._upgrades.push(cloneDeep(upgrade));
  };

  removeUpgrade = (upgrade: ClassUpgrade) => {
    const index = this._upgrades.findIndex(x => x.name === upgrade.name);
    if (index === -1) return;

    if (upgrade.subModifier)
      for (let i = 0; i < upgrade.count; i++) {
        this.defaultModifiers.push(upgrade.modifier);
      }

    this.removeModifier(upgrade.modifier, true, upgrade.count);
    this._upgrades.splice(index, 1);
  };

  private removeModifier = (modifier: Modifier, completely = false, count = 1) => {
    if (!completely) {
      this._currentModifiers.splice(
        this._currentModifiers.findIndex(x => x.image === modifier.image),
        1
      );
      return;
    }

    for (let i = 0; i < count; i++) {
      this.defaultModifiers.splice(
        this.currentModifiers.findIndex(x => x.image === modifier.image),
        1
      );
    }

    this._currentModifiers = [...this.defaultModifiers];
    this._remainingModifiers = [...this.defaultModifiers];
  };
}
