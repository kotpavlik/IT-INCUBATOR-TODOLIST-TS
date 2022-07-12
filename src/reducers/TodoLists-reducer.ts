import { Dispatch } from 'redux';
import {todoListsApi, TodoListType} from '../api/API';


export type initialStateType = Array<TodoListDomainType>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & { filter: FilterValuesType }

const initialState: initialStateType = []

export const todoListsReducer = (state: initialStateType = initialState, action: todoListsReducerType): initialStateType => {
    switch (action.type) {
        case 'CHANGE_FILTER_TODO_LIST': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, filter: action.payload.value} : el)
        }
        case 'REMOVE_TODO_LIST': {
            return state.filter(td => td.id !== action.payload.todoListId)
        }
        case 'ADD_NEW_TODO_LIST': {

            return {...state, [action.todoList.id]:[]}
        }
        case 'RENAME_TODO_LIST': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.newTitle} : el)
        }
        case 'SET_TODO_LISTS': {
            return action.todoLists.map(el => { return {...el,filter:"all"}})
        }
        default:
            return state;
    }
}

type todoListsReducerType = changeFilterTaskACType
    | removeTodoListACType
    | addNewTodoListsACType
    | renameTodoListACType
    | setTodoListsACType

type changeFilterTaskACType = ReturnType<typeof changeFilterTaskAC>
export const changeFilterTaskAC = (value: FilterValuesType, todoListId: string) => {
    return {
        type: 'CHANGE_FILTER_TODO_LIST',
        payload: {value, todoListId}
    } as const
}
type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE_TODO_LIST',
        payload: {todoListId}
    } as const
}
type addNewTodoListsACType = ReturnType<typeof addNewTodoListsAC>
export const addNewTodoListsAC = (todoList:TodoListType) => {
    return {
        type: 'ADD_NEW_TODO_LIST',
        todoList
    } as const
}
type renameTodoListACType = ReturnType<typeof renameTodoListAC>
export const renameTodoListAC = (newTitle: string, todoListId: string) => {
    return {
        type: 'RENAME_TODO_LIST',
        payload: {newTitle, todoListId}
    } as const
}

export type setTodoListsACType = ReturnType<typeof setTodoLists>
export const setTodoLists = (todoLists: TodoListType[]) => {
    return {
        type: 'SET_TODO_LISTS',
        todoLists
    } as const
}


export const fetchTodoListTC = () => {
   return (dispatch: Dispatch) => {
        todoListsApi.getTodoLists()
            .then((resp) => {
                dispatch(setTodoLists(resp.data))
            })
    }
}
export const addNewTodoListsTC = (title:string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.createTodoList(title)
            .then((resp) => {
                dispatch(addNewTodoListsAC(resp.data.item))
            })
    }
}
