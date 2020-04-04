import { HeroClass } from 'src/core/HeroClass';

const heroIcons: { [key in HeroClass]: any } = {
  Scoundrel: require('../../../assets/images/classes/scoundrel.png'),
  Tinkerer: require('../../../assets/images/classes/tinkerer.png'),
  Monsters: require('../../../assets/images/classes/monster.png'),
  Tyrant: require('../../../assets/images/classes/tyrant.png'),
  Berserk: require('../../../assets/images/classes/berserk.png'),
};

export default heroIcons;
