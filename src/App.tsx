import React, {useCallback} from 'react';
import './App.css';
import TodoList, {TaskType} from './components/todo_list/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/addItemForm/AddItemForm';
import {ExampleAnimation} from './components/lottie/LottieAnimation';
import {
    addNewTodoListsAC,

} from './reducers/TodoLists-reducer';
import {
    addNewTodoListsAndTasksAC,

} from './reducers/Tasks-reducer';
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

function App() {
    const dispatch = useDispatch();
    const tasksObj = useSelector<AppStateType,TasksObjType>(state => state.tasks)
    const todoLists = useSelector<AppStateType,Array<TodoListsType>>(state => state.todoLists)


    const  addNewTodoLists = useCallback((title: string) => {
        let id: string = v1();
        dispatch(addNewTodoListsAC(title, id))
        dispatch(addNewTodoListsAndTasksAC(id))
    }, [dispatch])

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
                        />
                    )
                }) : <div></div>}
            </div>
        </div>
    );
}

export default App;
const TodoListMemo = React.memo(TodoList)