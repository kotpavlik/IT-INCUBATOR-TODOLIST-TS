import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../../App';
import style from './TodoList.module.css'
import {DeleteOutlined} from '@ant-design/icons';

type TodoListPropsTypeTitle = {
    todoId: string
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
    removeTasks: (id: string, todoListId: string) => void;
    changeFilter: (value: FilterValuesType, todoListId: string) => void;
    addTasks: (taskName: string, todoListId: string) => void;
    changeIsDoneTask: (taskId: string, isDone: boolean, todoListId: string) => void;
    removeTodoList: (todoListId: string) => void
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
            props.addTasks(trimTaskName, props.todoId);
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
        props.changeFilter('all', props.todoId)
    };
    const onClickActiveHandler = () => {
        props.changeFilter('active', props.todoId)
    };
    const onClickCompletedHandler = () => {
        props.changeFilter('completed', props.todoId)
    };
    const onClickRemoveTodoList = () => {
        props.removeTodoList(props.todoId)

}
const tasksListItems = props.tasks.length
    ? props.tasks.map((el) => {
        const onClickRemoveTask = () => {
            props.removeTasks(el.id, props.todoId);
        };
        const onClickIsDoneTask = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeIsDoneTask(el.id, e.currentTarget.checked, props.todoId);
        }
        return (
            <li key={el.id} className={style.task}>
                <input type="checkbox" checked={el.isDone} onChange={onClickIsDoneTask}/>
                <span
                    className={el.isDone ? '' : style.IsDone_false}>
                                    {el.title}</span>
                <button onClick={onClickRemoveTask}
                        className={`${style.no_active_button} ${style.del}`}>✖️
                </button>
            </li>
        );
    })
    : <span className={style.no_tasks}>No tasks</span>;
const styleInputError = error ? style.error_input : style.input_style;
const styleButtonAllActive = props.filter === 'all' ? style.active_button : style.no_active_button;
const styleButtonActiveActive = props.filter === 'active' ? style.active_button : style.no_active_button;
const styleButtonCompletedActive = props.filter === 'completed' ? style.active_button : style.no_active_button;


return (
    <div className="wrapper">
        <div className={style.wrapper_all}>
            <h3 className={style.title_task}>{props.title}
                <span
                    className={style.delete_task}
                    onClick={onClickRemoveTodoList}
                ><DeleteOutlined/>
                    </span>
            </h3>
            <div>
                {error && <span className={style.error_message}>{error}</span>}
                <input
                    value={taskName}
                    onChange={onChangeHandlerTaskName}
                    onKeyPress={onKeyPressHandlerTaskName}
                    className={styleInputError}/>
                <button onClick={addTask} className={style.no_active_button}>send</button>

            </div>
            <ul className={style.tasks_list}>
                {tasksListItems}
            </ul>
            <div>
                <button
                    className={styleButtonAllActive}
                    onClick={onClickAllHandler}>All
                </button>
                <button
                    className={styleButtonActiveActive}
                    onClick={onClickActiveHandler}>Active
                </button>
                <button
                    className={styleButtonCompletedActive}
                    onClick={onClickCompletedHandler}>Completed
                </button>

            </div>
        </div>
    </div>
);
}
;

export default TodoList;
