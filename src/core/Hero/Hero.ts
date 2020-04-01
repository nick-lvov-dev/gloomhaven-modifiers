import { Modifier } from '../Modifiers/models/Modifier';
import { ClassUpgrade } from '../ClassUpdgrades/models/ClassUpgrade';
import { HeroClass } from '../HeroClass';
import { cloneDeep, uniq } from 'lodash';
import random from 'src/common/helpers/random.helper';
import StandardModifiers from '../Modifiers/StandardModifiers';
import StandardModifierDeck from '../ModifierDecks/StandardModifierDeck';

class HeroOptions implements Partial<Hero> {
  currentModifiers?: Modifier[];
  remainingModifiers?: Modifier[];
  drawn?: Modifier[];
  upgrades?: ClassUpgrade[];
}

export interface DrawResult {
  drawn: Modifier[];
  total: string;
}

export class Hero {
  private _defaultModifiers: Modifier[];
  private _currentModifiers: Modifier[];
  private _remainingModifiers: Modifier[];
  private _drawn: Modifier[] = [];
  private _upgrades: ClassUpgrade[] = [];

  constructor(public readonly heroClass: HeroClass, defaultModifiers: Modifier[] = [], options?: HeroOptions) {
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

  get drawnTotal() {
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
      total.effects = total.effects.concat(mod.effects ?? []);
      i++;
    }

    total.effects = uniq(total.effects);
    return (typeof total?.attack === 'number' ? [`Attack: ${total.attack > 0 ? '+' : ''}${total.attack.toString()}`] : [])
      .concat(total?.heal ? [`Heal: ${total.heal > 0 ? '+' : ''}${total.heal.toString()}`] : [])
      .concat(total?.pierce ? [`Pierce: ${total.pierce > 0 ? '+' : ''}${total.pierce.toString()}`] : [])
      .concat(total?.targets ? [`Targets: ${total.targets > 0 ? '+' : ''}${total.targets.toString()}`] : [])
      .concat(total?.effects ? total.effects : [])
      .join(' ');
  }

  lastDrawn = (n = 1) => (this._drawn.length >= n ? this._drawn.slice(-n)[0] : null);

  get cursesTotal() {
    return this._currentModifiers.filter(x => x.id === StandardModifiers.Curse.id).length;
  }

  get blessesTotal() {
    return this._currentModifiers.filter(x => x.id === StandardModifiers.Bless.id).length;
  }

  get extraMinusOneTotal() {
    return this._currentModifiers.filter(x => x.id === StandardModifiers.ExtraNOne.id).length;
  }

  draw = () => {
    this._shuffleCheck();
    this._draw();
  };

  drawTwo = (): DrawResult[] => {
    this._shuffleCheck();
    let drawn: Modifier[] = [];
    do {
      this._draw();
      drawn.push(this.lastDrawn()!);
    } while (this.lastDrawn()?.next);
    const firstResult: DrawResult = { drawn: [...drawn], total: this.drawnTotal! };

    drawn = [];
    do {
      this._draw();
      drawn.push(this.lastDrawn()!);
    } while (this.lastDrawn()?.next);
    const secondResult: DrawResult = { drawn: [...drawn], total: this.drawnTotal! };

    return [firstResult, secondResult];
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

  addMinusOne = () => {
    this._currentModifiers.push(StandardModifiers.ExtraNOne);
    this.shuffle();
  };

  addUpgrade = (upgrade: ClassUpgrade) => {
    this._addUpgrade(upgrade);
    this.shuffle(true);
  };

  removeUpgrade = (upgrade: ClassUpgrade) => {
    this._removeUpgrade(upgrade);
    this.shuffle(true);
  };

  updateUpgrades = (upgrades: ClassUpgrade[]) => {
    this._defaultModifiers = cloneDeep(StandardModifierDeck);
    this._upgrades = [];
    for (const upgrade of upgrades) this._addUpgrade(upgrade);
    this.shuffle(true);
  };

  private _draw = () => {
    const index = random(this._remainingModifiers.length);
    const modifier = this._remainingModifiers[index];
    this._removeBlessCurse(modifier);
    this._drawn.push(modifier);
    this._remainingModifiers.splice(index, 1);
  };

  private _shuffleCheck = () => {
    if (this._drawn.some(x => x.shuffle)) this.shuffle();
  };

  private _addUpgrade = (upgrade: ClassUpgrade) => {
    if (this._upgrades.filter(x => x.name === upgrade.name).length >= upgrade.limit) return;

    if (upgrade.modifier)
      for (let i = 0; i < upgrade.count; i++) {
        this._defaultModifiers.push(upgrade.modifier);
      }

    if (upgrade.subModifier) this._cleanModifier(upgrade.subModifier, upgrade.count);
    this._upgrades.push(cloneDeep(upgrade));
  };

  private _removeUpgrade = (upgrade: ClassUpgrade) => {
    const index = this._upgrades.findIndex(x => x.name === upgrade.name);
    if (index === -1) return;

    if (upgrade.subModifier)
      for (let i = 0; i < upgrade.count; i++) {
        this._defaultModifiers.push(upgrade.subModifier);
      }

    if (upgrade.modifier) this._cleanModifier(upgrade.modifier, upgrade.count);
    this._upgrades.splice(index, 1);
  };

  private _removeBlessCurse = (modifier: Modifier) => {
    if ([StandardModifiers.Curse.id, StandardModifiers.Bless.id].some(x => x === modifier.id))
      this._currentModifiers.splice(
        this._currentModifiers.findIndex(x => x.id === modifier.id),
        1
      );
  };

  private _cleanModifier = (modifier: Modifier, count?: number) => {
    if (count)
      for (let i = 0; i < count; i++) {
        this._defaultModifiers.splice(
          this._defaultModifiers.findIndex(x => x.id === modifier.id),
          1
        );
      }
    else this._defaultModifiers = this._defaultModifiers.filter(x => x.id !== modifier.id);

    this._currentModifiers = cloneDeep(this._defaultModifiers);
    this._remainingModifiers = cloneDeep(this._defaultModifiers);
  };
}
