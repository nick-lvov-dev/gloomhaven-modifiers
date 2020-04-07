import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

const HISTORY_HINT_STORAGE_KEY = 'HISTORY_HINT_STORAGE_KEY';

export interface ProfileState {
  isHistoryHintShown: boolean;
}

const initialState: ProfileState = {
  isHistoryHintShown: false,
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setHistoryHintShown: (state: ProfileState, action: PayloadAction<boolean>) => ({ ...state, isHistoryHintShown: action.payload }),
  },
});

export const { actions: ProfileActions } = slice;
export default slice.reducer;

const { setHistoryHintShown } = ProfileActions;

export const showHistoryHint = () => async (dispatch: Dispatch) => {
  await AsyncStorage.setItem(HISTORY_HINT_STORAGE_KEY, 'true');
  dispatch(setHistoryHintShown(true));
};

export const loadHistoryHintData = () => async (dispatch: Dispatch) => {
  const res = await AsyncStorage.getItem(HISTORY_HINT_STORAGE_KEY);
  dispatch(setHistoryHintShown(res === 'true'));
};
