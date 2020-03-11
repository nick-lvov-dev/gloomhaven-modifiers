import { Modifier } from '../Modifiers/models/Modifier';
import { ClassUpgrade } from '../ClassUpdgrades/models/ClassUpgrade';
import { HeroClass } from '../HeroClass';
import { cloneDeep } from 'lodash';
import random from 'src/common/random';
import StandardModifiers from '../Modifiers/StandardModifiers';
import StandardModifierDeck from '../ModifierDecks/StandardModifierDeck';

class HeroOptions implements Partial<Hero> {
  currentModifiers?: Modifier[];
  remainingModifiers?: Modifier[];
  drawn?: Modifier[];
  upgrades?: ClassUpgrade[];
}

export class Hero {
  private _defaultModifiers: Modifier[];
  private _currentModifiers: Modifier[];
  private _remainingModifiers: Modifier[];
  private _drawn: Modifier[] = [];
  private _upgrades: ClassUpgrade[] = [];

  constructor(
    public readonly heroClass: keyof typeof HeroClass,
    public readonly name: string,
    defaultModifiers: Modifier[] = [],
    options?: HeroOptions
  ) {
    this._defaultModifiers = cloneDeep(defaultModifiers);
    this._currentModifiers = cloneDeep(this._defaultModifiers);
    this._remainingModifiers = cloneDeep(this._defaultModifiers);
    if (options) {
      if (options.currentModifiers) this._currentModifiers = cloneDeep(options.currentModifiers);
      if (options.remainingModifiers) this._remainingModifiers = cloneDeep(options.remainingModifiers);
      if (options.drawn) this._drawn = cloneDeep(options.drawn);
      if (options.upgrades) this._upgrades = cloneDeep(options.upgrades);
    }
  }

  get defaultModifiers() {
    return cloneDeep(this._defaultModifiers);
  }

  get currentModifiers() {
    return cloneDeep(this._currentModifiers);
  }

  get remainingModifiers() {
    return cloneDeep(this._remainingModifiers);
  }

  get drawn() {
    return cloneDeep(this._drawn);
  }

  get upgrades() {
    return cloneDeep(this._upgrades);
  }

  get lastDrawn() {
    if (!this._drawn.length) return;

    const total: Modifier = { ...this._drawn.slice(-1)[0] };
    total.attack = total.attack ?? 0;
    total.heal = total.heal ?? 0;
    total.targets = total.targets ?? 0;
    total.effects = total.effects ?? [];
    total.pierce = total.pierce ?? 0;
    let i = 2;
    while (i <= this._drawn.length && this._drawn.slice(-i)[0].next) {
      const mod = this._drawn.slice(-i)[0];
      total.attack += mod.attack ?? 0;
      total.heal += mod.heal ?? 0;
      total.pierce += mod.pierce ?? 0;
      total.targets += mod.targets ?? 0;
      total.effects = total.effects?.concat(mod.effects ?? []);
    }

    return total;
  }

  get cursesTotal() {
    return this._currentModifiers.filter(x => x.image === StandardModifiers.Curse.image).length;
  }

  get blessesTotal() {
    return this._currentModifiers.filter(x => x.image === StandardModifiers.Bless.image).length;
  }

  draw = () => {
    if (!this.lastDrawn?.next && this.lastDrawn?.shuffle) this.shuffle();

    const index = random(this._remainingModifiers.length);
    const modifier = this._remainingModifiers[index];
    this._drawn.push(modifier);
    if ([StandardModifiers.Curse.image, StandardModifiers.Bless.image].includes(modifier.image)) this.removeModifier(modifier);
    this._remainingModifiers.splice(index, 1);
  };

  shuffle = (clean = false) => {
    if (clean) this._currentModifiers = cloneDeep(this._defaultModifiers);
    this._remainingModifiers = cloneDeep(this._currentModifiers);
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
    if (this._upgrades.filter(x => x.name === upgrade.name).length >= upgrade.limit) return;

    if (upgrade.modifier)
      for (let i = 0; i < upgrade.count; i++) {
        this._defaultModifiers.push(upgrade.modifier);
      }

    if (upgrade.subModifier) this.removeModifier(upgrade.subModifier, true, upgrade.count);
    this._upgrades.push(cloneDeep(upgrade));
    this.shuffle(true);
  };

  removeUpgrade = (upgrade: ClassUpgrade) => {
    const index = this._upgrades.findIndex(x => x.name === upgrade.name);
    if (index === -1) return;

    if (upgrade.subModifier)
      for (let i = 0; i < upgrade.count; i++) {
        this._defaultModifiers.push(upgrade.subModifier);
      }

    if (upgrade.modifier) this.removeModifier(upgrade.modifier, true, upgrade.count);
    this._upgrades.splice(index, 1);
    this.shuffle(true);
  };

  updateUpgrades = (upgrades: ClassUpgrade[]) => {
    this._defaultModifiers = cloneDeep(StandardModifierDeck);
    this._upgrades = [];
    for (const upgrade of upgrades) this.addUpgrade(upgrade);
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
      this._defaultModifiers.splice(
        this._currentModifiers.findIndex(x => x.image === modifier.image),
        1
      );
    }

    this._currentModifiers = cloneDeep(this._defaultModifiers);
    this._remainingModifiers = cloneDeep(this._defaultModifiers);
  };
}
