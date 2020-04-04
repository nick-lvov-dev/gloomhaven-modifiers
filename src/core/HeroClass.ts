import heroIcons from 'src/core/images/heroIcons';

export enum HeroClass {
  Scoundrel = 'Scoundrel',
  Tinkerer = 'Tinkerer',
  Tyrant = 'Tyrant',
  Berserk = 'Berserk',
  Monsters = 'Monsters',
}

export type ClassVm = {
  id: number;
  name: HeroClass;
  icon: any;
};

export const classes: ClassVm[] = (Object.keys(HeroClass) as Array<HeroClass>).map((key, i) => ({
  id: i,
  name: key,
  icon: heroIcons[key],
}));
