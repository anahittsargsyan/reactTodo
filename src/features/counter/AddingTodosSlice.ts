import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  title: string;
  done: boolean;
  id: number;
  editable: boolean;
}
const initialState = {
  todos: [] as Todo[],
};

export const addingTodosSlice = createSlice({
  name: "addingTodos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      if (!action.payload.title) {
        return alert("Todo title is required");
      }
      state.todos.push(action.payload);
    },
    done: (state, action: PayloadAction<Todo>) => {
      const doneTodo = state.todos.find((item) => {
        return item.id === action.payload.id;
      });

      if (doneTodo) {
        doneTodo.done = !doneTodo.done;
      }
    },

    deleteTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter((e) => e.id !== action.payload.id);
    },
    deleteDone: (state) => {
      state.todos = state.todos.filter((e) => !e.done);
    },
    editTodo(state, action: PayloadAction<Todo>) {
      state.todos.forEach((item) => {
        if (item.id === action.payload.id) {
          item.editable = !item.editable;
        }
      });
    },

    editName: (state, action: PayloadAction<any>) => {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload.todo.id) {
          todo.title = action.payload.inputValue;
        }
      });
    },
    editedNameTodo: (state, action: PayloadAction<any>) => {
      state.todos.forEach((item) => {
        if (item.id === action.payload.id) {
          item.editable = !item.editable;
          return item;
        }
      });
    },
    selectAll: (state) => {
      if (state.todos.filter((x) => x.done).length !== state.todos.length) {
        state.todos.forEach((x) => {
          x.done = true;
        });
      } else {
        state.todos.forEach((x) => {
          x.done = false;
        });
      }
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  done,
  deleteDone,
  editTodo,
  editName,
  editedNameTodo,
  selectAll,
} = addingTodosSlice.actions;

export default addingTodosSlice.reducer;
