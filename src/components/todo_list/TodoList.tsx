import React, {useCallback} from 'react';
import {FilterValuesType} from '../../App';
import style from './TodoList.module.css'
import {DeleteOutlined} from '@ant-design/icons';
import {AddItemForm} from '../addItemForm/AddItemForm';
import EditableSpan from '../editableSpan/EditableSpan';
import {useDispatch} from 'react-redux';
import {changeFilterTaskAC, removeTodoListAC, renameTodoListAC} from '../../reducers/TodoLists-reducer';
import {
    addTasksAC,
    removeTodoListAndTasksAC,
} from '../../reducers/Tasks-reducer';
import {Task} from './task/Task';




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


const TodoList = React.memo( (props: TodoListPropsTypeTitle) => {

    const dispatch = useDispatch();

    const onClickRemoveTodoList = useCallback(() => {
        dispatch(removeTodoListAC(props.todoId))
        dispatch(removeTodoListAndTasksAC(props.todoId))
    },[props.todoId,props.todoId]) // все что приходит из пропсов или замыкания (не из параметров) передаем в зависимости
//
    const addTask = useCallback((title: string) => {
        dispatch(addTasksAC(title, props.todoId))},[props.todoId])


    const editTitleHandler = useCallback((newTitle: string) => {
        dispatch(renameTodoListAC(newTitle, props.todoId))
    },[props.todoId])

    let tasksForTodoList = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter((el) => el.isDone === false);
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter((el) => el.isDone === true);
    }

    const tasksListItems = tasksForTodoList.length
        ? tasksForTodoList.map((el) =>{
            return (
                 <Task id={el.id} todoId={props.todoId} isDone={el.isDone} title={el.title} key={el.id}/>
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



