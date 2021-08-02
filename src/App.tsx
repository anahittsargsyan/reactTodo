import React, { ChangeEvent, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  deleteDone,
  deleteTodo,
  done,
  editedNameTodo,
  editName,
  editTodo,
  selectAll,
} from "./features/counter/AddingTodosSlice";

interface Todo {
  title: string;
  done: boolean;
  id: number;
  editable: boolean;
}

function App() {
  const dispatch = useDispatch();
  let todoList = useSelector((state: any) => state.addingTodos.todos);
  const [inputValue, setInputValue] = useState<string>("");
  const [type, setType] = useState<string>("all");

  function getInputValue(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  const countLength = todoList.filter((todo: Todo) => !todo.done).length;

  const initialState = {
    todos: todoList,
  };
  switch (type) {
    case "active":
      initialState.todos = todoList.filter((e: Todo) => !e.done);
      break;
    case "completed":
      initialState.todos = todoList.filter((e: Todo) => e.done);
      break;
    default:
      break;
  }

  function createTodo() {
    dispatch(
      addTodo({
        title: inputValue,
        done: false,
        id: Math.random(),
        editable: false,
      })
    );
    setInputValue("");
  }
  function clickAll() {
    setType("all");
  }

  function clickActive() {
    setType("active");
  }

  function clickCompleted() {
    setType("completed");
  }

  return (
    <div className="App">
      <header className="App-header align-items-center d-flex">
        <h1>todos</h1>
        <div className="inputTodo">
          <div className="arrow" onClick={() => dispatch(selectAll())}>
            <AiOutlineArrowDown />
          </div>

          <input
            className="inputSpace"
            placeholder="What needs to be done?"
            onChange={getInputValue}
            value={inputValue}
            onKeyDown={(event) => event.key === "Enter" && createTodo()}
          />
        </div>

        {initialState.todos.map((todo: any, index: any) => {
          return (
            <div
              className="todo-container mt-1"
              key={index}
              onKeyDown={(event) =>
                event.key === "Enter" && dispatch(editedNameTodo(todo))
              }
            >
              <div
                className="title-container d-flex "
                onDoubleClick={() => dispatch(editTodo(todo))}
              >
                <div className="checkField">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => dispatch(done(todo))}
                    id="flexCheckDefault"
                    checked={todo.done}
                  />

                  {!todo.editable && (
                    <label className="form-check-label">{todo.title}</label>
                  )}
                </div>
                {todo.editable && (
                  <div>
                    <input
                      type="editable"
                      className="editName"
                      onChange={(event) =>
                        dispatch(
                          editName({
                            todo,
                            inputValue: event.target.value,
                          } as any)
                        )
                      }
                      value={todo.title}
                    />
                  </div>
                )}
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => dispatch(deleteTodo(todo))}
                >
                  X
                </button>
              </div>
            </div>
          );
        })}

        <div className="filters mt-1 d-flex">
          <div className="count">{countLength} items left</div>
          <div className="filter2">
            <div className="filter" onClick={clickAll}>
              All
            </div>
            <div className="filter" onClick={clickActive}>
              Active
            </div>
            <div className="filter" onClick={clickCompleted}>
              Completed
            </div>
          </div>
          <div className="clear" onClick={() => dispatch(deleteDone())}>
            <p> Clear Completed </p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
