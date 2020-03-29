import { HeroClass } from 'src/core/HeroClass';

export type RootStackParamsList = {
  Home: undefined;
  HeroEdit: { hero?: HeroClass };
};
