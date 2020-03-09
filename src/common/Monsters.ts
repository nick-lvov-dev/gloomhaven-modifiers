import { Hero } from 'src/core/Hero/Hero';
import { nameof } from './nameof';
import { HeroClass } from 'src/core/HeroClass';
import MonsterModifierDeck from 'src/core/ModifierDecks/MonsterModifierDeck';

export const Monsters = new Hero(nameof<typeof HeroClass>('Monsters'), nameof<typeof HeroClass>('Monsters'), MonsterModifierDeck);
