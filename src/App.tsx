import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./components/todo_list/TodoList";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let TodoListTitle_1: string = "first tasks";


  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: false },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTasks(id: string) {
    let filteredTasks = tasks.filter((el) => el.id !== id);
    setTasks(filteredTasks);
  }
  function addTasks(taskName: string) {
    let newTask:TaskType = { id: v1(), title:taskName, isDone: false };
    setTasks([ newTask,...tasks]);
  }
  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }
  function changeIsDoneTask( taskId:string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks])
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
        filter={filter}
        removeTasks={removeTasks}
        changeFilter={changeFilter}
        addTasks ={addTasks}
        changeIsDoneTask={changeIsDoneTask}
      />

    </div>
  );
}

export default App;
