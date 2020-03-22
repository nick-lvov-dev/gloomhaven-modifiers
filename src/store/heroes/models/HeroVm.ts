import { Hero } from 'src/core/Hero/Hero';
import { HeroClass } from 'src/core/HeroClass';
import { ClassUpgrade } from 'src/core/ClassUpdgrades/models/ClassUpgrade';

export class HeroVm {
  constructor(hero: Hero) {
    this.heroClass = hero.heroClass;
    this.name = hero.name;
    this.defaultModifiers = hero.defaultModifiers.map(x => x.id);
    this.currentModifiers = hero.currentModifiers.map(x => x.id);
    this.remainingModifiers = hero.remainingModifiers.map(x => x.id);
    this.drawn = hero.drawn.map(x => x.id);
    this.upgrades = hero.upgrades;
  }

  heroClass: keyof typeof HeroClass;
  name: string;
  defaultModifiers: string[];
  currentModifiers: string[];
  remainingModifiers: string[];
  drawn: string[];
  upgrades: ClassUpgrade[];
}
