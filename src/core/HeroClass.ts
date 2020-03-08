import heroIcons from 'assets/images/classes/heroIcons';

export const HeroClass = {
  Scoundrel: 'Scoundrel',
  Tinkerer: 'Tinkerer',
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
