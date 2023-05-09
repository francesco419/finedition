import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import session from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import elementReducer from './Slices/eleSlice';
import alarmReducer from './Slices/alarm';
//////////////////////////////
const rootReducer = combineReducers({
  element: elementReducer,
  alarm: alarmReducer
});

const persistConfig = {
  key: 'root',
  storage: session
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
