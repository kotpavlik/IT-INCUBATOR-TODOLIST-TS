import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import style from './TodoList.module.css'
import {DeleteOutlined} from '@ant-design/icons';
import {AddItemForm} from '../addItemForm/AddItemForm';
import EditableSpan from '../editableSpan/EditableSpan.';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch} from 'react-redux';
import {changeFilterTaskAC, removeTodoListAC, renameTodoListAC} from '../../reducers/TodoLists-reducer';
import {
    addTasksAC,
    changeIsDoneTaskAC,
    removeTasksAC,
    removeTodoListAndTasksAC,
    renameTasksAC
} from '../../reducers/Tasks-reducer';

const label = {inputProps: {'aria-label': 'Checkbox demo'}};


type TodoListPropsTypeTitle = {
    todoId: string
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
};

export type TaskType = {
    //  если убрать здесь export в файле где он импортируется не нужно явно типизировать массив, TS это сделает сам.
    // Но это не правельный подход, по скольку всё должно быть явно типизировано
    id: string;
    title: string;
    isDone: boolean;
};


const TodoList = (props: TodoListPropsTypeTitle) => {

    const dispatch = useDispatch();

    const onClickRemoveTodoList = () => {
        dispatch(removeTodoListAC(props.todoId))
        dispatch(removeTodoListAndTasksAC(props.todoId))

    }
    const addTask = (title: string) => {
        dispatch(addTasksAC(title, props.todoId))
    }
    const editTitleHandler = (newTitle: string) => {
        dispatch(renameTodoListAC(newTitle, props.todoId))
    }

    const tasksListItems = props.tasks.length
        ? props.tasks.map((el) => {
            const onClickRemoveTask = () => {
                dispatch(removeTasksAC(el.id, props.todoId))
            };
            const onClickIsDoneTask = (e: ChangeEvent<HTMLInputElement>) => {
                dispatch(changeIsDoneTaskAC(el.id, e.currentTarget.checked, props.todoId))
            }
            const editTitleTasksHandler = (newTitle: string) => {
                dispatch(renameTasksAC(newTitle, el.id, props.todoId))
            }


            return (
                <li key={el.id} className={style.task}>
                    <Checkbox {...label} size="small" checked={el.isDone}
                              onChange={onClickIsDoneTask}/>

                    <span
                        className={el.isDone ? style.IsDone : style.IsDone_false}>
                                    <EditableSpan title={el.title} editTitle={editTitleTasksHandler}/></span>

                    <IconButton aria-label="delete" size="small" onClick={onClickRemoveTask}>
                        <DeleteIcon fontSize="small"/>
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
                        onClick={() => {
                            dispatch(changeFilterTaskAC('all', props.todoId))
                        }}>All
                    </button>
                    <button
                        className={styleButtonActiveActive}
                        onClick={() => {
                            dispatch(changeFilterTaskAC('active', props.todoId))
                        }}>Active
                    </button>
                    <button
                        className={styleButtonCompletedActive}
                        onClick={() => {
                            dispatch(changeFilterTaskAC('completed', props.todoId))
                        }}>Completed
                    </button>

                </div>
            </div>
        </div>
    );
};

export default TodoList;



