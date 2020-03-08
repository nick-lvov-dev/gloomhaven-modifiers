import { Modifier } from '../Modifiers/models/Modifier';
import MonsterModifiers from '../Modifiers/MonsterModifiers';

const MonsterModifierDeck: Modifier[] = [];

for (let i = 0; i < 6; i++) MonsterModifierDeck.push(MonsterModifiers.Zero);
for (let i = 0; i < 5; i++) MonsterModifierDeck.push(MonsterModifiers.One);
for (let i = 0; i < 5; i++) MonsterModifierDeck.push(MonsterModifiers.MinusOne);
MonsterModifierDeck.push(MonsterModifiers.Two);
MonsterModifierDeck.push(MonsterModifiers.MinusTwo);
MonsterModifierDeck.push(MonsterModifiers.Double);
MonsterModifierDeck.push(MonsterModifiers.NoDamage);

export default MonsterModifierDeck;
