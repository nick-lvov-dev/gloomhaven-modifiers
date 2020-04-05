import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../store';
import AsyncStorage from '@react-native-community/async-storage';
import { HeroVm } from './models/HeroVm';
import { cloneDeep } from 'lodash';
import StandardModifiers from 'src/core/Modifiers/StandardModifiers';
import { HeroClass } from 'src/core/HeroClass';
import { Monsters } from 'src/common/Monsters';

const HEROES_STORAGE_KEY = 'HEROES_STORAGE_KEY';

export interface HeroesState {
  heroes: HeroVm[];
  isLoading: boolean;
  heroesLoaded: boolean;
  blessCount: number;
  heroCurseCount: number;
  minusOneCount: number;
}

const initialState: HeroesState = {
  heroes: [],
  isLoading: false,
  heroesLoaded: false,
  blessCount: 0,
  heroCurseCount: 0,
  minusOneCount: 0,
};

const getHeroCurseCount = (heroes: HeroVm[]) =>
  heroes.reduce((total, hero) => total + hero.currentModifiers.filter(x => x === StandardModifiers.Curse.id).length, 0);

const getBlessCount = (heroes: HeroVm[]) =>
  heroes.reduce((total, hero) => total + hero.currentModifiers.filter(x => x === StandardModifiers.Bless.id).length, 0);

const getMinusOneCount = (heroes: HeroVm[]) =>
  heroes.reduce((total, hero) => total + hero.currentModifiers.filter(x => x === StandardModifiers.ExtraNOne.id).length, 0);

const slice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<HeroVm[]>) => {
      const heroes = action.payload;
      return {
        ...state,
        heroes: [...heroes],
        heroesLoaded: true,
        blessCount: getBlessCount(heroes),
        heroCurseCount: getHeroCurseCount(heroes),
        minusOneCount: getMinusOneCount(heroes),
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => ({ ...state, isLoading: action.payload }),
  },
});

export const { actions: HeroesActions } = slice;
export default slice.reducer;

const { load, setLoading } = HeroesActions;

export const loadHeroes = () => async (dispatch: Dispatch, getState: () => RootState) => {
  // await AsyncStorage.removeItem(HEROES_STORAGE_KEY);
  dispatch(setLoading(true));
  try {
    const heroesJson = await AsyncStorage.getItem(HEROES_STORAGE_KEY);
    const heroes = heroesJson ? (JSON.parse(heroesJson) as HeroVm[]) : [];
    if (!heroes.length) {
      addHero(new HeroVm(Monsters))(dispatch, getState);
      return;
    }
    dispatch(load(heroes));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const addHero = (hero: HeroVm) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const heroes = getState().heroes.heroes;
  if (heroes.some(x => x.heroClass === hero.heroClass)) {
    dispatch(setLoading(false));
    return;
  }
  try {
    await AsyncStorage.setItem(HEROES_STORAGE_KEY, JSON.stringify(heroes.concat([hero])));
    dispatch(load(heroes.concat([cloneDeep(hero)])));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const updateHero = (hero: HeroVm) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const heroes = getState().heroes.heroes.map(x => (x.heroClass === hero.heroClass ? cloneDeep(hero) : x));
  try {
    await AsyncStorage.setItem(HEROES_STORAGE_KEY, JSON.stringify(heroes));
    dispatch(load(heroes));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};

export const removeHero = (heroClass: HeroClass) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const heroes = getState().heroes.heroes.filter(x => x.heroClass !== heroClass);
  try {
    await AsyncStorage.setItem(HEROES_STORAGE_KEY, JSON.stringify(heroes));
    dispatch(load(heroes));
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setLoading(false));
  }
};
