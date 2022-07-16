import React, {useCallback, useEffect} from 'react';
import style from './TodoList.module.css'
import {DeleteOutlined} from '@ant-design/icons';
import {AddItemForm} from '../addItemForm/AddItemForm';
import EditableSpan from '../editableSpan/EditableSpan';
import {useDispatch} from 'react-redux';
import {
    changeFilterTaskAC,
    removeTodoListTC, TodoListDomainType,
    updateTodoListTC
} from '../../reducers/TodoLists-reducer';
import {
    addTaskTC, fetchTasksTC
} from '../../reducers/Tasks-reducer';
import {Task} from './task/Task';
import {TaskStatuses, TaskType} from '../../api/API';
import {CircularProgress, Stack} from '@mui/material';


type TodoListPropsTypeTitle = {
    todolist: TodoListDomainType
    tasks: Array<TaskType>;
    demo?: boolean
};


const TodoList = React.memo(({demo = false, ...props}: TodoListPropsTypeTitle) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTasksTC(props.todolist.id) as any)
    }, [])

    const onClickRemoveTodoList = useCallback(() => {
        dispatch(removeTodoListTC(props.todolist.id) as any)
    }, [props.todolist.id, props.todolist.id]) // все что приходит из пропсов или замыкания (не из параметров) передаем в зависимости
//
    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolist.id, title) as any)
    }, [props.todolist.id])


    const editTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTodoListTC(props.todolist.id, newTitle) as any)
    }, [props.todolist.id])

    let tasksForTodoList = props.tasks;
    if (props.todolist.filter === 'active') {
        tasksForTodoList = props.tasks.filter((el) => el.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodoList = props.tasks.filter((el) => el.status === TaskStatuses.Completed);
    }

    const tasksListItems = tasksForTodoList && tasksForTodoList.length
        ? tasksForTodoList.map((el) => {

                return (
                    <Task id={el.id} todoId={props.todolist.id} status={el.status} title={el.title} key={el.id}/>
                )
            }
        )
        : <span className={style.no_tasks}>No tasks</span>;


    const styleButtonAllActive = props.todolist.filter === 'all' ? style.active_button : style.no_active_button;
    const styleButtonActiveActive = props.todolist.filter === 'active' ? style.active_button : style.no_active_button;
    const styleButtonCompletedActive = props.todolist.filter === 'completed' ? style.active_button : style.no_active_button;

    return (
        <div className={style.wrapper_all_tasks}>
            <div className={style.wrapper_all}>
                <h3 className={style.title_task}>
                    <EditableSpan title={props.todolist.title} editTitle={editTitleHandler}/>
                    {
                        props.todolist.entityStatus === 'idle'
                            ?
                            <div
                                className={style.delete_task}
                                onClick={onClickRemoveTodoList}>
                                <DeleteOutlined/>
                            </div>
                            :
                            <div>
                                     <CircularProgress color="primary" size={20} />
                            </div>
                    }
                </h3>
                <AddItemForm addItem={addTask} buttonName={'send'} disabled={props.todolist.entityStatus === 'loading'}/>
                <ul className={style.tasks_list}>
                    {tasksListItems}
                </ul>
                <div>
                    <button
                        className={styleButtonAllActive}
                        onClick={useCallback(() => {
                            dispatch(changeFilterTaskAC('all', props.todolist.id))
                        }, [props.todolist.id])}>All
                    </button>
                    <button
                        className={styleButtonActiveActive}
                        onClick={useCallback(() => {
                            dispatch(changeFilterTaskAC('active', props.todolist.id))
                        }, [props.todolist.id])}>Active
                    </button>
                    <button
                        className={styleButtonCompletedActive}
                        onClick={useCallback(() => {
                            dispatch(changeFilterTaskAC('completed', props.todolist.id))
                        }, [props.todolist.id])}>Completed
                    </button>

                </div>
            </div>
        </div>
    );
})

export default TodoList;



