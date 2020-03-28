import heroIcons from 'src/core/images/heroIcons';

export const HeroClass = {
  Scoundrel: 'Scoundrel',
  Tinkerer: 'Tinkerer',
  Tyrant: 'Tyrant',
  Monsters: 'Monsters',
};

export type ClassVm = {
  id: number;
  name: keyof typeof heroIcons;
  icon: any;
};

export const classes: ClassVm[] = (Object.keys(HeroClass) as Array<keyof typeof HeroClass>).map((key, i) => ({
  id: i,
  name: key,
  icon: heroIcons[key],
}));
