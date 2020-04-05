import { ModifierEffect } from '../Modifiers/models/ModifierEffect';

const icons: { [key in ModifierEffect]: any } = Object.freeze({
  [ModifierEffect.Muddle]: require('../../../assets/images/statuses/muddle.png'),
  [ModifierEffect.Strengthen]: require('../../../assets/images/statuses/strengthen.png'),
  [ModifierEffect.Curse]: require('../../../assets/images/statuses/curse.png'),
  [ModifierEffect.Bless]: require('../../../assets/images/statuses/bless.png'),
  [ModifierEffect.Disarm]: require('../../../assets/images/statuses/disarm.png'),
  [ModifierEffect.Stun]: require('../../../assets/images/statuses/stun.png'),
  [ModifierEffect.Immobilize]: require('../../../assets/images/statuses/immobilize.png'),
  [ModifierEffect.Invisible]: require('../../../assets/images/statuses/invisibility.png'),
  [ModifierEffect.Poison]: require('../../../assets/images/statuses/poison.png'),
  [ModifierEffect.Wound]: require('../../../assets/images/statuses/wound.png'),

  [ModifierEffect.Double]: require('../../../assets/images/statuses/double.png'),
  [ModifierEffect.NoAttack]: require('../../../assets/images/statuses/noDmg.png'),

  [ModifierEffect.Air]: require('../../../assets/images/statuses/air.png'),
  [ModifierEffect.Earth]: require('../../../assets/images/statuses/earth.png'),
  [ModifierEffect.Fire]: require('../../../assets/images/statuses/fire.png'),
  [ModifierEffect.Ice]: require('../../../assets/images/statuses/ice.png'),
  [ModifierEffect.Light]: require('../../../assets/images/statuses/light.png'),
  [ModifierEffect.Dark]: require('../../../assets/images/statuses/dark.png'),
});

export default icons;
