import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import heroes, { HeroesState } from './heroes/heroes';
import profile from './profile';
import thunk from 'redux-thunk';
import { ProfileState } from './profile';

export interface RootState {
  heroes: HeroesState;
  profile: ProfileState;
}

const rootReducer = combineReducers<RootState>({
  heroes,
  profile,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
