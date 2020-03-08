import { HeroClass } from 'src/core/HeroClass';

const heroIcons: { [key in keyof typeof HeroClass]: any } = {
  Scoundrel: require('./scoundrel.png'),
  Tinkerer: require('./tinkerer.png'),
  Monsters: require('./monster.png'),
};

export default heroIcons;
