import React, { ChangeEvent, useState } from "react";
//import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineArrowDown } from "react-icons/ai";

interface Todo {
  title: string;
  done: boolean;
  id: number;
  editable: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [type, setType] = useState<string>("all");
  const [selectAll, setSelectAll] = useState<boolean>(false);

  function getInputValue(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  const countLength = todos.filter((todo) => !todo.done).length;

  const initialState = {
    todos: todos,
  };
  switch (type) {
    case "active":
      initialState.todos = activeTodos;
      break;
    case "completed":
      initialState.todos = completedTodos;
      break;
    case "all":
      initialState.todos = todos;
      break;
    default:
      break;
  }

  function done(todo: Todo, e: any) {
    let x = initialState.todos.filter((item) => {
      if (item.id === todo.id) {
        item.done = !item.done;
        return item;
      }
      return item;
    });
    setTodos(() => x);
  }

  function createTodo() {
    if (!inputValue) {
      return alert("Todo title is required");
    }
    setTodos((state) => [
      ...state,

      {
        title: inputValue,
        done: false,
        id: Math.random(),
        editable: false,
      },
    ]);
    setInputValue("");
  }
  function clickAll() {
    setType("all");
  }

  function handleRemove(todo: any) {
    const newArr: Todo[] = todos.filter((e) => e.id !== todo.id);
    setTodos(() => newArr);
  }
  function clickActive() {
    const array: Todo[] = todos.filter((e) => !e.done);
    setType("active");
    setActiveTodos(() => [...array]);
  }
  function deleteDone() {
    const array: Todo[] = todos.filter((e) => !e.done);
    setTodos(array);
    const arr: Todo[] = completedTodos.filter((e) => !e.done);
    setCompletedTodos(arr);
  }
  function clickCompleted() {
    const array: Todo[] = todos.filter((e) => e.done);
    setType("completed");
    setCompletedTodos(() => [...array]);
  }
  function editTodo(todo: Todo) {
    todo.editable = true;
    setTodos((state) => [...state]);
  }
  function editNameTodo(todo: Todo) {
    todo.editable = false;

    setTodos((state) => [...state]);
  }
  function editName(event: ChangeEvent<HTMLInputElement>, todo: Todo) {
    todo.title = event.target.value;
    setTodos((state) => [...state]);
  }

  function selectAllFn() {
    todos.forEach((todo) => {
      todo.done = selectAll;
    });
    setTodos((state) => [...state]);
  }
  return (
    <div className="App">
      <header className="App-header align-items-center d-flex">
        <h1>todos</h1>
        <div className="inputTodo">
          <div
            className="arrow"
            onClick={() => {
              setSelectAll(!selectAll);
              selectAllFn();
            }}
          >
            <AiOutlineArrowDown />
          </div>

          <input
            className="ban"
            placeholder="What needs to be done?"
            onChange={getInputValue}
            value={inputValue}
            onKeyDown={(event) => event.key === "Enter" && createTodo()}
          />
        </div>

        {initialState.todos.map((todo, index) => {
          return (
            <div
              className="todo-container mt-1"
              key={index}
              onKeyDown={(event) => event.key === "Enter" && editNameTodo(todo)}
            >
              <div
                className="title-container d-flex "
                onDoubleClick={() => editTodo(todo)}
              >
                <div className="checkField">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => done(todo, e)}
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
                      onChange={(event) => editName(event, todo)}
                      value={todo.title}
                    />
                  </div>
                )}
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => handleRemove(todo)}
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
          <div className="clear" onClick={deleteDone}>
            <p> Clear Completed </p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
