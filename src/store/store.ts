import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import heroes, { HeroesState } from './heroes/heroes';
import thunk from 'redux-thunk';

export interface RootState {
  heroes: HeroesState;
}

const rootReducer = combineReducers<RootState>({
  heroes,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
