import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import style from './TodoList.module.css'
import {DeleteOutlined} from '@ant-design/icons';
import {AddItemForm} from '../addItemForm/AddItemForm';
import EditableSpan from '../editableSpan/EditableSpan.';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


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
    renameTodoList: (newTitle: string, todoId: string) => void
    renameTasks:(newTitle:string, taskId:string, todoListId:string) => void
};

export type TaskType = {
    //  если убрать здесь export в файле где он импортируется не нужно явно типизировать массив, TS это сделает сам.
    // Но это не правельный подход, по скольку всё должно быть явно типизировано
    id: string;
    title: string;
    isDone: boolean;
};



const TodoList = (props: TodoListPropsTypeTitle) => {


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
    const addTask = (title: string) => {
        return props.addTasks(title, props.todoId)
    }
    const editTitleHandler =(newTitle: string) => {
        props.renameTodoList(newTitle, props.todoId)
    }

    const tasksListItems = props.tasks.length
        ? props.tasks.map((el) => {
            const onClickRemoveTask = () => {
                props.removeTasks(el.id, props.todoId);
            };
            const onClickIsDoneTask = (e:ChangeEvent<HTMLInputElement>) => {
                props.changeIsDoneTask(el.id, e.currentTarget.checked, props.todoId);
            }
            const editTitleTasksHandler = (newTitle: string) => {
                props.renameTasks(newTitle, el.id, props.todoId)
            }



            return (
                <li key={el.id} className={style.task}>
                    <Checkbox {...label} defaultChecked size="small" checked={el.isDone}
                              onChange={onClickIsDoneTask} />

                    <span
                        className={el.isDone ? style.IsDone : style.IsDone_false}>
                                    <EditableSpan title={el.title} editTitle={editTitleTasksHandler}/></span>

                    <IconButton aria-label="delete" size="small"  onClick={onClickRemoveTask}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </li>
            );
        })
        : <span className={style.no_tasks}>No tasks</span>;
    const styleButtonAllActive = props.filter === 'all' ? style.active_button : style.no_active_button;
    const styleButtonActiveActive = props.filter === 'active' ? style.active_button : style.no_active_button;
    const styleButtonCompletedActive = props.filter === 'completed' ? style.active_button : style.no_active_button;


    return (
        <div className={style.wrapper_all_tasks}>
            <div className={style.wrapper_all}>
                <h3 className={style.title_task}>
                    <EditableSpan title={props.title} editTitle={editTitleHandler}/>
                    <span
                        className={style.delete_task}
                        onClick={onClickRemoveTodoList}
                    ><DeleteOutlined/>
                    </span>
                </h3>
                <AddItemForm addItem={addTask} buttonName={'send'}/>
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
};

export default TodoList;


