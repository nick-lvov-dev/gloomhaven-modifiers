import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { RootState } from '../store';
import AsyncStorage from '@react-native-community/async-storage';
import { Hero } from 'src/core/Hero/Hero';
import { HeroVm } from './models/HeroVm';

const HEROES_STORAGE_KEY = 'HEROES_STORAGE_KEY';

export interface HeroesState {
  heroes: HeroVm[];
  isLoading: boolean;
  heroesLoaded: boolean;
}

const initialState: HeroesState = {
  heroes: [],
  isLoading: false,
  heroesLoaded: false,
};

const slice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHeroes: (state, action: PayloadAction<HeroVm[]>) =>
      produce(state, draft => {
        draft.heroes = action.payload;
        draft.heroesLoaded = true;
      }),
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

export const addHero = (hero: Hero) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const heroes = getState().heroes.heroes;
  if (heroes.some(x => x.name === hero.name)) {
    dispatch(setLoading(false));
    return;
  }
  await AsyncStorage.setItem(HEROES_STORAGE_KEY, JSON.stringify(heroes.concat([new HeroVm(hero)])));
  dispatch(setHeroes(heroes.concat([new HeroVm(hero)])));
  dispatch(setLoading(false));
};

export const updateHero = (hero: Hero) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const heroes = getState().heroes.heroes.map(x => (x.name === hero.name ? new HeroVm(hero) : x));
  await AsyncStorage.setItem(HEROES_STORAGE_KEY, JSON.stringify(heroes));
  dispatch(setHeroes(heroes));
  dispatch(setLoading(false));
};

export const removeHero = (hero: Hero | HeroVm | string) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setLoading(true));
  const heroes = getState().heroes.heroes.filter(x => x.name !== (typeof hero === 'string' ? hero : hero.name));
  await AsyncStorage.setItem(HEROES_STORAGE_KEY, JSON.stringify(heroes));
  dispatch(setHeroes(heroes));
  dispatch(setLoading(false));
};
