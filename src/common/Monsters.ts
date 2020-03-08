import { Hero } from 'src/core/Hero/Hero';
import { nameof } from './nameof';
import { HeroClass } from 'src/core/HeroClass';
import { HeroVm } from 'src/store/heroes/models/HeroVm';
import MonsterModifierDeck from 'src/core/ModifierDecks/MonsterModifierDeck';

export const Monsters = new HeroVm(new Hero(nameof<typeof HeroClass>('Monsters'), nameof<typeof HeroClass>('Monsters'), MonsterModifierDeck));
