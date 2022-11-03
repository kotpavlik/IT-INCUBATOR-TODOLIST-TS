import { combineReducers, } from 'redux';
import  thunkMiddleware, {ThunkAction,ThunkDispatch} from 'redux-thunk'
import {tasksReducer, tasksReducersACType} from './Tasks-reducer';
import {todoListsReducer, todoListsReducersType} from './TodoLists-reducer';
import {loadState, saveState} from '../utilities/localStorage';
import {appReducer, appReducersType} from './App-reducer';
import {LoginActionType, loginReducer} from './Login-reducer';
import {configureStore} from '@reduxjs/toolkit';


// add all reducers into rootReducers with used combineReducers
const rootReducers = combineReducers({
    tasks:tasksReducer,
    todoLists:todoListsReducer,
    app:appReducer,
    login:loginReducer
    }
)

// create store add rootReducer , localStorage , applyMiddleware(for thunkMiddleware)
//export const store = createStore(rootReducers,loadState(),applyMiddleware(thunkMiddleware))

export const store = configureStore({
    reducer: rootReducers,
    middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
    preloadedState:loadState()
})


// Local Storage used
store.subscribe(() => {
    saveState({
        tasks:store.getState().tasks,
        todoLists:store.getState().todoLists,
        app:store.getState().app,
        login:store.getState().login

    })
})

// App state types
export type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>


// Thunk types
//All actions types
export type AppActionsType = todoListsReducersType | tasksReducersACType |  LoginActionType |appReducersType
//All thunks type
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppStateType,unknown,AppActionsType>
// Types for dispatch thunks !!! no AnyTypes
export type AppDispatch = ThunkDispatch<AppStateType,unknown,AppActionsType>



// @ts-ignore
window.store = store
