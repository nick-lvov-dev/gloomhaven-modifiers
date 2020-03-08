import { Modifier } from '../Modifiers/models/Modifier';
import StandardModifiers from '../Modifiers/StandardModifiers';

const StandardModifierDeck: Modifier[] = [];

for (let i = 0; i < 6; i++) StandardModifierDeck.push(StandardModifiers.Zero);
for (let i = 0; i < 5; i++) StandardModifierDeck.push(StandardModifiers.One);
for (let i = 0; i < 5; i++) StandardModifierDeck.push(StandardModifiers.MinusOne);
StandardModifierDeck.push(StandardModifiers.Two);
StandardModifierDeck.push(StandardModifiers.MinusTwo);
StandardModifierDeck.push(StandardModifiers.Double);
StandardModifierDeck.push(StandardModifiers.NoDamage);

export default StandardModifierDeck;
