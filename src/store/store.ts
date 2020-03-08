import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { HeroesState, HeroesReducer } from './heroes/heroes';
import thunk from 'redux-thunk';

export interface RootState {
  heroes: HeroesState;
}

const rootReducer = combineReducers<RootState>({
  heroes: HeroesReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
