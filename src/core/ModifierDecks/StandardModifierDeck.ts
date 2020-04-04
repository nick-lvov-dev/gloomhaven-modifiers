import { Modifier } from '../Modifiers/models/Modifier';
import StandardModifiers from '../Modifiers/StandardModifiers';

export default () => {
  const deck: Modifier[] = [];

  for (let i = 0; i < 6; i++) deck.push(StandardModifiers.Zero);
  for (let i = 0; i < 5; i++) deck.push(StandardModifiers.One);
  for (let i = 0; i < 5; i++) deck.push(StandardModifiers.MinusOne);
  deck.push(StandardModifiers.Two);
  deck.push(StandardModifiers.MinusTwo);
  deck.push(StandardModifiers.Double);
  deck.push(StandardModifiers.NoDamage);

  return deck;
};
