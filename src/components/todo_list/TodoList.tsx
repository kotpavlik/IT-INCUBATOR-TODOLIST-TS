import React, {useCallback,useEffect} from 'react';
import style from './TodoList.module.css'
import {DeleteOutlined} from '@ant-design/icons';
import {AddItemForm} from '../addItemForm/AddItemForm';
import EditableSpan from '../editableSpan/EditableSpan';
import {useDispatch} from 'react-redux';
import {
    changeFilterTaskAC,
    FilterValuesType,
    removeTodoListAC,
    renameTodoListAC
} from '../../reducers/TodoLists-reducer';
import {
    addTaskTC, fetchTasksTC,
    removeTodoListAndTasksAC,
} from '../../reducers/Tasks-reducer';
import {Task} from './task/Task';
import {TaskStatuses, TaskType} from '../../api/API';




type TodoListPropsTypeTitle = {
    todoId: string
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
};




const TodoList = React.memo( (props: TodoListPropsTypeTitle) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoId) as any)
    },[])

    const onClickRemoveTodoList = useCallback(() => {
        dispatch(removeTodoListAC(props.todoId))
        dispatch(removeTodoListAndTasksAC(props.todoId))
    },[props.todoId,props.todoId]) // все что приходит из пропсов или замыкания (не из параметров) передаем в зависимости
//
    const addTask = useCallback((title: string) => {
        debugger
        dispatch(addTaskTC( props.todoId,title) as any)},[props.todoId])


    const editTitleHandler = useCallback((newTitle: string) => {
        dispatch(renameTodoListAC(newTitle, props.todoId))
    },[props.todoId])

    let tasksForTodoList = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter((el) => el.status === TaskStatuses.New);
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter((el) => el.status === TaskStatuses.Completed);
    }

    const tasksListItems = tasksForTodoList.length
        ? tasksForTodoList.map((el) =>{

            return (
                 <Task id={el.id} todoId={props.todoId} status={el.status} title={el.title} key={el.id}/>
            )
            }
        )
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
                        onClick={useCallback(() => {
                            dispatch(changeFilterTaskAC('all', props.todoId))
                        },[props.todoId])}>All
                    </button>
                    <button
                        className={styleButtonActiveActive}
                        onClick={useCallback(() => {
                            dispatch(changeFilterTaskAC('active', props.todoId))
                        },[props.todoId])}>Active
                    </button>
                    <button
                        className={styleButtonCompletedActive}
                        onClick={useCallback(() => {
                            dispatch(changeFilterTaskAC('completed', props.todoId))
                        },[props.todoId])}>Completed
                    </button>

                </div>
            </div>
        </div>
    );
})

export default TodoList;



