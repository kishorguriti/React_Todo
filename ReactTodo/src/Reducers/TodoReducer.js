import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const todoSlice = createSlice({
  name: "todoLength",
  initialState,

  reducers: {
    getTodoLength: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getTodoLength } = todoSlice.actions;

export default todoSlice.reducer;
