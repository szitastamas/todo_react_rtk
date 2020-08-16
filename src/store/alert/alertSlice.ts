import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IAlert from "../../architecture/interfaces/alert/IAlert";

const initialState: IAlert[] = [];

type addAlertObject = {
  text: string;
  type: string;
  duration: number;
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    add: {
      reducer: (state, { payload }: PayloadAction<IAlert>) => {
          state = [...state, payload];
      },
      prepare: ({ text, type, duration }: addAlertObject) => {
        return {
          payload: {
            id: Math.random(),
            text,
            type,
            duration,
          },
        };
      },
    },
    remove: (state, { payload }: PayloadAction<IAlert>) => {
        state = state.filter(alert => alert.id !== payload.id)
    }
  },
});

export const { add, remove } = alertSlice.actions;

export default alertSlice.reducer;