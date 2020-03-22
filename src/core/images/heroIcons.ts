import { HeroClass } from 'src/core/HeroClass';

const heroIcons: { [key in keyof typeof HeroClass]: any } = {
  Scoundrel: require('../../../assets/images/classes/scoundrel.png'),
  Tinkerer: require('../../../assets/images/classes/tinkerer.png'),
  Monsters: require('../../../assets/images/classes/monster.png'),
};

export default heroIcons;
