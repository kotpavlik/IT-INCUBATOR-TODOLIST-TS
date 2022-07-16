import {applyMiddleware, combineReducers, createStore} from 'redux';
import  thunkMiddleware from 'redux-thunk'
import {tasksReducer} from './Tasks-reducer';
import {todoListsReducer} from './TodoLists-reducer';
import {loadState, saveState} from '../utilities/localStorage';
import {appReducer} from './App-reducer';



const rootReducers = combineReducers({
    tasks:tasksReducer,
    todoLists:todoListsReducer,
    app:appReducer
    }
)

export const store = createStore(rootReducers,loadState(),applyMiddleware(thunkMiddleware))

store.subscribe(() => {
    saveState({
        tasks:store.getState().tasks,
        todoLists:store.getState().todoLists,
        app:store.getState().app

    })
})

export type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>


// @ts-ignore
window.store = store
