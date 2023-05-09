import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { APITYPE } from '../../main/apiContents';

export interface ElementState {
  element: APITYPE[];
}

const initialState: ElementState = {
  element: []
};

export const elementSlice = createSlice({
  name: 'ele',
  initialState,
  reducers: {
    addAPI: (state, action: PayloadAction<APITYPE>) => {
      let temp = [...state.element];
      temp.push(action.payload);
      state.element = [...temp];
    },
    delAPI: (state, action: PayloadAction<APITYPE>) => {
      let temp = [...state.element];
      const newArr = temp.filter((data) => {
        if (data.title !== action.payload.title) {
          return data;
        }
      });
      state.element = [...newArr];
    }
  }
});

export const { addAPI, delAPI } = elementSlice.actions;

export const selectEle = (state: RootState) => state.element.element;

export const selectTitle = (state: RootState): string[] => {
  let title: string[] = [];
  state.element.element.map((data) => {
    title.push(data.title);
  });

  return title;
};

export default elementSlice.reducer;
