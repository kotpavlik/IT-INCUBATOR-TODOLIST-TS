import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let TodoListTitle_1: string = "first tascks";
  //   let TodoListTitle_2: string = "second tascks";
  //   let TodoListTitle_3: string = "next tascks";
  //   let TodoListTitle_4: string = "and next one tascks";

  //   let tasks_2: Array<TaskType> = [
  //     // можно так обозначать type array
  //     { id: 0, title: "Bread", isDone: false },
  //     { id: 1, title: "Milk", isDone: false },
  //     { id: 2, title: "Salt", isDone: true },
  //   ];
  //   let tasks_3: TaskType[] = [
  //     // можно так обозначать type array
  //     { id: 0, title: "Coffee", isDone: true },
  //     { id: 1, title: "Tea", isDone: false },
  //     { id: 2, title: "Water", isDone: false },
  //   ];
  //   let tasks_4: TaskType[] = [
  //     { id: 0, title: "Maksim", isDone: true },
  //     { id: 1, title: "Oleg", isDone: true },
  //     { id: 2, title: "Igor", isDone: false },
  //     { id: 3, title: "Nina", isDone: false },
  //     { id: 4, title: "Dasha", isDone: true },
  //   ];

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: false },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
  ]);
  console.log(tasks);
  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTasks(id: string) {
    let filteredTasks = tasks.filter((el) => el.id !== id);
    setTasks(filteredTasks);
  }
  function addTasks(taskName: string) {
    let newTask = { id: v1(), title:taskName, isDone: true };
    setTasks([ newTask,...tasks]);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === "active") {
    tasksForTodoList = tasks.filter((el) => el.isDone === false);
  }
  if (filter === "completed") {
    tasksForTodoList = tasks.filter((el) => el.isDone === true);
  }

  return (
    <div className="App">
      <TodoList
        title={TodoListTitle_1}
        tasks={tasksForTodoList}
        removeTasks={removeTasks}
        changeFilter={changeFilter}
        addTasks ={addTasks}
      />
      {/* <TodoList title={TodoListTitle_2} tascks={tasks_2} />
      <TodoList title={TodoListTitle_3} tascks={tasks_3} />
      <TodoList title={TodoListTitle_4} tascks={tasks_4} /> */}
    </div>
  );
}

export default App;
