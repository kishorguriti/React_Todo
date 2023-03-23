import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./Reducers/TodoReducer";

export const Store = configureStore({
  reducer: {
    todoLength: todoSlice,
  },
});
