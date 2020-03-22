import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { RootState } from '../store';
import AsyncStorage from '@react-native-community/async-storage';
import { HeroVm } from './models/HeroVm';
import { cloneDeep } from 'lodash';
import StandardModifiers from 'src/core/Modifiers/StandardModifiers';

const HEROES_STORAGE_KEY = 'HEROES_STORAGE_KEY';

export interface HeroesState {
  heroes: HeroVm[];
  isLoading: boolean;
  heroesLoaded: boolean;
  blessCount: number;
  heroCurseCount: number;
}

const initialState: HeroesState = {
  heroes: [],
  isLoading: false,
  heroesLoaded: false,
  blessCount: 0,
  heroCurseCount: 0,
};

const getHeroCurseCount = (heroes: HeroVm[]) =>
  heroes.reduce(
    (total, hero) => total + hero.currentModifiers.filter(x => x === StandardModifiers.Curse.id).length,
    0
  );

const getBlessCount = (heroes: HeroVm[]) =>
  heroes.reduce(
    (total, hero) => total + hero.currentModifiers.filter(x => x === StandardModifiers.Bless.id).length,
    0
  );

const slice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHeroes: (state, action: PayloadAction<HeroVm[]>) => {
      const heroes = action.payload;
      return {
        ...state,
        heroes: [...heroes],
        heroesLoaded: true,
        blessCount: getBlessCount(heroes),
        heroCurseCount: getHeroCurseCount(heroes),
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) =>
      produce(state, draft => {
        draft.isLoading = action.payload;
      }),
  },
});

export const { actions: HeroesActions, reducer: HeroesReducer } = slice;
const { setHeroes, setLoading } = HeroesActions;

export const loadHeroes = () => async (dispatch: Dispatch) => {
  // await AsyncStorage.removeItem(HEROES_STORAGE_KEY);
  dispatch(setLoading(true));
  const heroesJson = await AsyncStorage.getItem(HEROES_STORAGE_KEY);
  const heroes = heroesJson ? (JSON.parse(heroesJson) as HeroVm[]) : [];
  dispatch(setHeroes(heroes));
  dispatch(setLoading(false));
};

export const addHero = (hero: HeroVm) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const heroes = getState().heroes.heroes;
  if (heroes.some(x => x.name === hero.name)) {
    dispatch(setLoading(false));
    return;
  }
  await AsyncStorage.setItem(HEROES_STORAGE_KEY, JSON.stringify(heroes.concat([hero])));
  dispatch(setHeroes(heroes.concat([cloneDeep(hero)])));
  dispatch(setLoading(false));
};

export const updateHero = (hero: HeroVm) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const heroes = getState().heroes.heroes.map(x => (x.name === hero.name ? cloneDeep(hero) : x));
  await AsyncStorage.setItem(HEROES_STORAGE_KEY, JSON.stringify(heroes));
  dispatch(setHeroes(heroes));
  dispatch(setLoading(false));
};

export const removeHero = (heroName: string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const heroes = getState().heroes.heroes.filter(x => x.name !== heroName);
  await AsyncStorage.setItem(HEROES_STORAGE_KEY, JSON.stringify(heroes));
  dispatch(setHeroes(heroes));
  dispatch(setLoading(false));
};
