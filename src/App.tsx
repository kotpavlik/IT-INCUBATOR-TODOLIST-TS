import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from './components/todo_list/TodoList';
import {AddItemForm} from './components/addItemForm/AddItemForm';
import {ExampleAnimation} from './components/lottie/LottieAnimation';
import {addNewTodoListsTC, fetchTodoListTC, TodoListDomainType,
} from './reducers/TodoLists-reducer';
import {TasksObjType,} from './reducers/Tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './reducers/store';







function App() {
    const dispatch = useDispatch();
    const tasksObj = useSelector<AppStateType,TasksObjType>(state => state.tasks)
    const todoLists = useSelector<AppStateType,Array<TodoListDomainType>>(state => state.todoLists)



    useEffect(()=> {
        dispatch(fetchTodoListTC() as any)
    } ,[])

    const  addNewTodoLists = useCallback((title: string) => {
        dispatch(addNewTodoListsTC(title) as any)
    }, []) // dispatch можно не прокидовать в зависимости с версии React 18



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

                {todoLists && todoLists ? todoLists.map((tl: TodoListDomainType) => {

                    let tasksForTodoList = tasksObj[tl.id];
                    return (
                        <TodoListMemo
                            key={tl.id}
                            todoId={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            filter={tl.filter}
                        />
                    )
                }) : <div></div>}
            </div>
        </div>
    );
}

export default App;
const TodoListMemo = React.memo(TodoList)