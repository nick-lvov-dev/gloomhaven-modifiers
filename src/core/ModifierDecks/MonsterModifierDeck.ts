import { Modifier } from '../Modifiers/models/Modifier';
import MonsterModifiers from '../Modifiers/MonsterModifiers';

export default () => {
  const deck: Modifier[] = [];

  for (let i = 0; i < 6; i++) deck.push(MonsterModifiers.Zero);
  for (let i = 0; i < 5; i++) deck.push(MonsterModifiers.One);
  for (let i = 0; i < 5; i++) deck.push(MonsterModifiers.MinusOne);
  deck.push(MonsterModifiers.Two);
  deck.push(MonsterModifiers.MinusTwo);
  deck.push(MonsterModifiers.Double);
  deck.push(MonsterModifiers.NoDamage);

  return deck;
};
