import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TodoListPropsTypeTitle = {
    title: string;
    tasks: Array<TaskType>;
    removeTasks: (id: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTasks: (taskName: string) => void;
};

export type TaskType = {
    //  если убрать здесь export в файле где он импортируется не нужно явно типизировать массив, TS это сделает сам.
    // Но это не правельный подход, по скольку всё должно быть явно типизировано
    id: string;
    title: string;
    isDone: boolean;
};


const TodoList = (props: TodoListPropsTypeTitle) => {
    const [taskName, setTaskName] = useState<string>('');


    const addTask = () => {
        props.addTasks(taskName);
        setTaskName('');
    };
    const onChangeHandlerTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value);
    };
    const onKeyPressHandlerTaskName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13) {
            props.addTasks(taskName);
            setTaskName('');
        }
    };
    const onClickAllHandler = () => {
        props.changeFilter('all')
    };
    const onClickActiveHandler = () => {
        props.changeFilter('active')
    };
    const onClickCompletedHandler = () => {
        props.changeFilter('completed')
    };


    return (
        <div className="wrapper">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={taskName}
                        onChange={onChangeHandlerTaskName}
                        onKeyPress={onKeyPressHandlerTaskName}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) => {
                        const onClickRemoveTask = () => {
                            props.removeTasks(el.id);
                        };
                        return (
                            <li key={el.id}>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                                <button onClick={onClickRemoveTask}>x</button>
                            </li>
                        );
                    })}
                </ul>
                <div>
                    <button onClick={onClickAllHandler}>All</button>
                    <button onClick={onClickActiveHandler}>Active</button>
                    <button onClick={onClickCompletedHandler}>Completed
                    </button>

                </div>
            </div>
        </div>
    );
};

export default TodoList;
