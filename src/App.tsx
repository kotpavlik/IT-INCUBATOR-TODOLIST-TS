import React, {useEffect} from 'react';
import './App.css';
import TodoList, {TaskType} from './components/todo_list/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/addItemForm/AddItemForm';
import {ExampleAnimation} from './components/lottie/LottieAnimation';
import {
    addNewTodoListsAC,
    changeFilterTaskAC,
    removeTodoListAC,
    renameTodoListAC,
} from './reducers/TodoLists-reducer';
import {
    addNewTodoListsAndTasksAC,
    addTasksAC,
    changeIsDoneTaskAC,
    removeTasksAC,
    removeTodoListAndTasksAC, renameTasksAC,
} from './reducers/Tasks-reducer';
import {setToLocalStorage} from './localStorage/LocalStorage';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './reducers/store';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksObjType = {
    [key: string]: Array<TaskType>
}

export  const getTasksObjLocalStorage = () => {
    let newValue_tasksObj = localStorage.getItem('value_tasks');
    if (newValue_tasksObj) {
        let new_start_value = JSON.parse(newValue_tasksObj);
        return new_start_value
    }
}
export const getTodoListsLocalStorage = () => {
    let newValue_todoLists = localStorage.getItem('value_todoLists');
    if (newValue_todoLists) {
        let new_start_value = JSON.parse(newValue_todoLists);
        return new_start_value
    }
}

function App() {
    const dispatch = useDispatch();
    const tasksObj = useSelector<AppStateType,TasksObjType>(state => state.tasks)
    const todoLists = useSelector<AppStateType,Array<TodoListsType>>(state => state.todoLists)


    useEffect(() => {
        if(todoLists)
        setToLocalStorage('value_todoLists', todoLists)
    }, [todoLists]);
    useEffect(() => {
        if(tasksObj)
        setToLocalStorage('value_tasks', tasksObj)
    }, [tasksObj]);

    function removeTasks(id: string, todoListId: string) {
        dispatch(removeTasksAC(id, todoListId))
    }

    function addTasks(taskName: string, todoListId: string) {
        dispatch(addTasksAC(taskName, todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeFilterTaskAC(value, todoListId))

    }

    function changeIsDoneTask(taskId: string, isDone: boolean, todoListId: string) {

        dispatch(changeIsDoneTaskAC(taskId, isDone, todoListId))
    }

    function removeTodoList(todoListId: string) {
        dispatch(removeTodoListAC(todoListId))
        dispatch(removeTodoListAndTasksAC(todoListId))
    }

    function addNewTodoLists(title: string) {
        let id: string = v1();
        dispatch(addNewTodoListsAC(title, id))
        dispatch(addNewTodoListsAndTasksAC(id))
    }

    function renameTodoList(newTitle: string, todoListId: string) {
        dispatch(renameTodoListAC(newTitle, todoListId))
    }

    function renameTasks(newTitle: string, taskId: string, todoListId: string) {
        dispatch(renameTasksAC(newTitle, taskId, todoListId))
    }


    return (
        <div className="App">
            <div className="title_plus_lottie">
                <div className="global_title"> YourToDo</div>
                <span><ExampleAnimation/></span>
            </div>
            <div className="addNewTodoLists">
                <AddItemForm addItem={addNewTodoLists} buttonName={'add'}/>
            </div>
            <div className="wrapper_global_all">

                {todoLists ? todoLists.map((tl: TodoListsType) => {
                    let tasksForTodoList = tasksObj[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter((el) => el.isDone === false);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter((el) => el.isDone === true);
                    }
                    return (
                        <TodoListMemo
                            key={tl.id}
                            todoId={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            filter={tl.filter}
                            removeTasks={removeTasks}
                            changeFilter={changeFilter}
                            addTasks={addTasks}
                            changeIsDoneTask={changeIsDoneTask}
                            removeTodoList={removeTodoList}
                            renameTodoList={renameTodoList}
                            renameTasks={renameTasks}
                        />
                    )
                }) : <div></div>}
            </div>
        </div>
    );
}

export default App;
const TodoListMemo = React.memo(TodoList)