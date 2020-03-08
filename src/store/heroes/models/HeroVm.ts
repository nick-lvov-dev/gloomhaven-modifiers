import { Hero } from 'src/core/Hero/Hero';
import { HeroClass } from 'src/core/HeroClass';
import { Modifier } from 'src/core/Modifiers/models/Modifier';
import { ClassUpgrade } from 'src/core/ClassUpdgrades/models/ClassUpgrade';

export class HeroVm {
  constructor(hero: Hero) {
    this.heroClass = hero.heroClass;
    this.name = hero.name;
    this.defaultModifiers = hero.defaultModifiers;
    this.currentModifiers = hero.currentModifiers;
    this.remainingModifiers = hero.remainingModifiers;
    this.drawn = hero.drawn;
    this.upgrades = hero.upgrades;
  }

  heroClass: keyof typeof HeroClass;
  name: string;
  defaultModifiers: Modifier[];
  currentModifiers: Modifier[];
  remainingModifiers: Modifier[];
  drawn: Modifier[];
  upgrades: ClassUpgrade[];
}
