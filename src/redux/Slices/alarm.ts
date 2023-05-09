import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { APITYPE } from '../../main/apiContents';

export interface AlarmState {
  alarm: boolean;
  text: string;
}

const initialState: AlarmState = {
  alarm: false,
  text: ''
};

export const elementSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    addAlarm: (state) => {
      if (!state.alarm) {
        state.alarm = true;
        state.text = `추가되었습니다`;
      }
    },
    delAlarm: (state) => {
      if (!state.alarm) {
        state.alarm = true;
        state.text = `삭제되었습니다`;
      }
    },
    falseAlarm: (state) => {
      state.alarm = false;
    }
  }
});

export const { addAlarm, delAlarm, falseAlarm } = elementSlice.actions;

export const selectAlarm = (state: RootState) => state.alarm;

export default elementSlice.reducer;
