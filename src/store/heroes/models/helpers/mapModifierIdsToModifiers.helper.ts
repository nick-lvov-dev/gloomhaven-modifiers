import { HeroClass } from 'src/core/HeroClass';
import StandardModifiers from 'src/core/Modifiers/StandardModifiers';
import ClassModifiers from 'src/core/Modifiers/ClassModifiers';

export const mapModifierIdsToModifiers = (heroClass: keyof typeof HeroClass, modifiers: string[]) =>
  modifiers.map(
    x => [...Object.values(StandardModifiers), ...Object.values(ClassModifiers[heroClass])].find(modifier => modifier.id === x)!
  );
