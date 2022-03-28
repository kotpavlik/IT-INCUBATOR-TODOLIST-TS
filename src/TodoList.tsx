import React from "react";

type TodoListPropsTypeTitle = {
  title: string | number;
  tascks: Array<TaskType>;
};

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

const TodoList = (props: TodoListPropsTypeTitle) => {
  return (
    <div className="wrapper">
      <div>
        <h3>{props.title}</h3>
        <div>
          <input />
          <button>+</button>
        </div>
        <ul>
          <li>
            <input type="checkbox" checked={props.tascks[0].isDone} />{" "}
            <span>{props.tascks[0].title}</span>
          </li>
          <li>
            <input type="checkbox" checked={props.tascks[1].isDone} />{" "}
            <span>{props.tascks[1].title}</span>
          </li>
          <li>
            <input type="checkbox" checked={props.tascks[2].isDone} />{" "}
            <span>{props.tascks[2].title}</span>
          </li>
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
