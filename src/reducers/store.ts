import {applyMiddleware, combineReducers, createStore} from 'redux';
import  thunkMiddleware from 'redux-thunk'
import {tasksReducer} from './Tasks-reducer';
import {todoListsReducer} from './TodoLists-reducer';



const rootReducers = combineReducers({
    tasks:tasksReducer,
    todoLists:todoListsReducer
    }
)

export const store = createStore(rootReducers,applyMiddleware(thunkMiddleware))

export type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

