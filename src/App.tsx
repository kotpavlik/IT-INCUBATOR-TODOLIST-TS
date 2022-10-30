import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from './components/todo_list/TodoList';
import {AddItemForm} from './components/addItemForm/AddItemForm';
import {ExampleAnimation} from './components/lottie/LottieAnimation';
import {
    addNewTodoListsTC, fetchTodoListTC, TodoListDomainType,
} from './reducers/TodoLists-reducer';
import {TasksObjType,} from './reducers/Tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppStateType} from './reducers/store';
import {LinearProgress} from '@mui/material';
import {ErrorSnackbar} from './components/errorSnackbar/ErrorSnackbar';
import {requestStatusType} from './reducers/App-reducer';
import {initialStateType, removeLoginTC} from './reducers/Login-reducer';
import {Navigate} from 'react-router-dom';


type appPropsType = {
    demo?: boolean
}

function App({demo = false}: appPropsType) {
    const dispatch: AppDispatch = useDispatch();
    const tasksObj = useSelector<AppStateType, TasksObjType>(state => state.tasks)
    const todoLists = useSelector<AppStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const status = useSelector<AppStateType, requestStatusType>(state => state.app.status)
    const login_data = useSelector<AppStateType, initialStateType>(state => state.login)


    useEffect(() => {
        if (!demo) {
            dispatch(fetchTodoListTC())
        }
    }, [])

    const addNewTodoLists = useCallback((title: string) => {
        dispatch(addNewTodoListsTC(title))
    }, []) // dispatch можно не прокидовать в зависимости с версии React 18

    if (!login_data.isAuth) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div className="App">
            <div className="header_container">
                <div className="item_header_container">
                    <span className="header_user_id">
                        user id:{login_data.id}
                    </span>
                </div>
                <div className="item_header_container">
                    <button className="header_button" onClick={() => dispatch(removeLoginTC())}>
                        logout
                    </button>
                </div>
            </div>
            <ErrorSnackbar/>
            {status === 'loading' && <div className="loading"><LinearProgress color="secondary"/></div>}
            <div className="title_plus_lottie">
                <div className="global_title"> YourToDo</div>
                <span><ExampleAnimation/></span>
            </div>
            <div className="addNewTodoLists">
                <AddItemForm addItem={addNewTodoLists} buttonName={'add'}/>
            </div>
            <div className="wrapper_global_all">

                {todoLists && todoLists ? todoLists.map((tl: TodoListDomainType) => {

                    let tasksForTodoList = tasksObj[tl.id];
                    return (
                        <TodoListMemo
                            key={tl.id}
                            todolist={tl}
                            tasks={tasksForTodoList}
                            demo={demo}
                        />)
                }) : <div></div>}
            </div>
        </div>
    );
}

export default App;
const TodoListMemo = React.memo(TodoList)