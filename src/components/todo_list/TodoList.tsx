import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../../App';
import style from './TodoList.module.css'

type TodoListPropsTypeTitle = {
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
    removeTasks: (id: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTasks: (taskName: string) => void;
    changeIsDoneTask: (taskId: string, isDone: boolean) => void;
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
    const [error, setError] = useState<string | null>(null);


    const addTask = () => {
        let trimTaskName = taskName.trim();
        if (trimTaskName) {
            props.addTasks(trimTaskName);
            setTaskName('');
        } else {
            setError('Title is required');
        }

    };
    const onChangeHandlerTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value);
        setError(null);
    };
    const onKeyPressHandlerTaskName = (e: KeyboardEvent<HTMLInputElement>) => {
        let trimTaskName = taskName.trim();
        if (trimTaskName === 'wtf' || trimTaskName === 'fuck') {
            setTaskName('');
            alert('не ругайся')
            return;
        }
        if (e.ctrlKey && e.charCode === 13) {
            addTask();
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
                    {error && <span className={style.error_message}>{error}</span>}
                    <input
                        value={taskName}
                        onChange={onChangeHandlerTaskName}
                        onKeyPress={onKeyPressHandlerTaskName}
                        className={error ? style.error_input : style.input_style}/>
                    <button onClick={addTask} className={style.no_active_button}>send</button>

                </div>
                <ul className={style.tasks_list}>
                    {props.tasks.map((el) => {

                        const onClickRemoveTask = () => {
                            props.removeTasks(el.id);
                        };
                        const onClickIsDoneTask = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeIsDoneTask(el.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={el.id} className={style.task}>
                                <input type="checkbox" checked={el.isDone} onChange={onClickIsDoneTask}/>
                                <span
                                    className={el.isDone ? "" : style.IsDone_false}>
                                    {el.title}</span>
                                <button onClick={onClickRemoveTask}
                                        className={`${style.no_active_button} ${style.del}`}>x</button>

                            </li>
                        );
                    })}
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? style.active_button : style.no_active_button}
                        onClick={onClickAllHandler}>All
                    </button>
                    <button
                        className={props.filter === 'active' ? style.active_button : style.no_active_button}
                        onClick={onClickActiveHandler}>Active
                    </button>
                    <button
                        className={props.filter === 'completed' ? style.active_button : style.no_active_button}
                        onClick={onClickCompletedHandler}>Completed
                    </button>

                </div>
            </div>
        </div>
    );
};

export default TodoList;
