import {applyMiddleware, combineReducers, createStore} from 'redux';
import  thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {tasksReducer, tasksReducersACType} from './Tasks-reducer';
import {todoListsReducer, todoListsReducersType} from './TodoLists-reducer';
import {loadState, saveState} from '../utilities/localStorage';
import {appReducer, appReducersType} from './App-reducer';


// add all reducers into rootReducers with used combineReducers
const rootReducers = combineReducers({
    tasks:tasksReducer,
    todoLists:todoListsReducer,
    app:appReducer
    }
)

// create store add rootReducer , localStorage , applyMiddleware(for thunkMiddleware)
export const store = createStore(rootReducers,loadState(),applyMiddleware(thunkMiddleware))


// Local Storage used
store.subscribe(() => {
    saveState({
        tasks:store.getState().tasks,
        todoLists:store.getState().todoLists,
        app:store.getState().app

    })
})

// App state types
export type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>


// Thunk types
export type AppActionsType = todoListsReducersType | tasksReducersACType | appReducersType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppStateType,unknown,AppActionsType>



// @ts-ignore
window.store = store
