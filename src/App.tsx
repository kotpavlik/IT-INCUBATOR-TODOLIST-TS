import React from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";

function App() {
  let TodoListTitle_1: string = "first tascks";
  let TodoListTitle_2: string = "second tascks";
  let TodoListTitle_3: string = "next tascks";
  let TodoListTitle_4: string = "and next one tascks";

  let tascks_1: TaskType[] = [
    { id: 0, title: "HTML", isDone: true },
    { id: 1, title: "CSS", isDone: false },
    { id: 2, title: "JS", isDone: true },
  ];
  let tascks_2: TaskType[] = [
    { id: 0, title: "Bread", isDone: false },
    { id: 1, title: "Milk", isDone: false },
    { id: 2, title: "Salt", isDone: true },
  ];
  let tascks_3: TaskType[] = [
    { id: 0, title: "Coffee", isDone: true },
    { id: 1, title: "Tea", isDone: false },
    { id: 2, title: "Water", isDone: false },
  ];
  let tascks_4: TaskType[] = [
    { id: 0, title: "Maksim", isDone: true },
    { id: 1, title: "Oleg", isDone: true },
    { id: 2, title: "Igor", isDone: true },
  ];

  return (
    <div className="App">
      <TodoList title={TodoListTitle_1} tascks={tascks_1} />
      <TodoList title={TodoListTitle_2} tascks={tascks_2} />
      <TodoList title={TodoListTitle_3} tascks={tascks_3} />
      <TodoList title={TodoListTitle_4} tascks={tascks_4} />
    </div>
  );
}

export default App;
