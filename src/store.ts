import { configureStore } from '@reduxjs/toolkit'
import addingTodosReducer from "./features/counter/AddingTodosSlice";

export default configureStore({
  reducer: {
    addingTodos: addingTodosReducer,
  },
})