import React, {useEffect, useReducer} from 'react';
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
    todoListsReducer
} from './reducers/TodoLists-reducer';
import {
    addNewTodoListsAndTasksAC,
    addTasksAC,
    changeIsDoneTaskAC,
    removeTasksAC,
    removeTodoListAndTasksAC, renameTasksAC,
    tasksReducer
} from './reducers/Tasks-reducer';
import {setToLocalStorage} from './localStorage/LocalStorage';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksObjType = {
    [key: string]: Array<TaskType>
}

function App() {

    const tasksID_1 = v1();
    const tasksID_2 = v1();

    const getTasksObjLocalStorage = () => {
        let newValue_tasksObj = localStorage.getItem('value_tasks');
        if (newValue_tasksObj) {
            let new_start_value = JSON.parse(newValue_tasksObj);
            return new_start_value
        }
    }
    const getTodoListsLocalStorage = () => {
        let newValue_todoLists = localStorage.getItem('value_todoLists');
        if (newValue_todoLists) {
            let new_start_value = JSON.parse(newValue_todoLists);
            return new_start_value
        }
    }

    let [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,
        [
            {id: tasksID_1, title: 'What learn', filter: 'all'},
            {id: tasksID_2, title: 'What buy', filter: 'all'}
        ],getTodoListsLocalStorage);

    let [tasksObj, dispatchTasksObj] = useReducer(tasksReducer, {
            [tasksID_1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: false},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
            ],
            [tasksID_2]: [
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Milk', isDone: false}
            ]
        },getTasksObjLocalStorage
    );


    useEffect(() => {setToLocalStorage('value_todoLists',todoLists)}, [todoLists]);
    useEffect(() => { setToLocalStorage('value_tasks',tasksObj)}, [tasksObj]);

    function removeTasks(id: string, todoListId: string) {
        dispatchTasksObj(removeTasksAC(id,todoListId))
    }

    function addTasks(taskName: string, todoListId: string) {
        dispatchTasksObj( addTasksAC(taskName,todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchTodoLists(changeFilterTaskAC(value,todoListId))

    }

    function changeIsDoneTask(taskId: string, isDone: boolean, todoListId: string) {

        dispatchTasksObj(changeIsDoneTaskAC(taskId,isDone,todoListId))
    }

    function removeTodoList(todoListId: string) {
        dispatchTodoLists(removeTodoListAC(todoListId))
        dispatchTasksObj(removeTodoListAndTasksAC(todoListId))
    }

    function addNewTodoLists(title: string) {
        let id:string= v1();
        dispatchTodoLists(addNewTodoListsAC(title,id))
        dispatchTasksObj(addNewTodoListsAndTasksAC(title,id))
    }
    function renameTodoList(newTitle: string, todoListId: string) {
        dispatchTodoLists(renameTodoListAC(newTitle,todoListId))
    }
    function renameTasks(newTitle: string, taskId: string, todoListId: string) {
        dispatchTasksObj(renameTasksAC(newTitle,taskId,todoListId))
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

                {todoLists.map((tl:TodoListsType) => {
                    let tasksForTodoList = tasksObj[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter((el) => el.isDone === false);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter((el) => el.isDone === true);
                    }
                    return (
                        <TodoList
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
                })}</div>
        </div>
    );
}

export default App;
