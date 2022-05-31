import {FilterValuesType, TodoListsType} from '../App';



export type initialState = Array<TodoListsType>


const initialState:initialState = [

]

export const todoListsReducer = (state: Array<TodoListsType> = initialState, action:todoListsReducerType):Array<TodoListsType> => {
    switch (action.type) {
        case 'CHANGE_FILTER_TODO_LIST': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, filter: action.payload.value} : el)
        }
        case 'REMOVE_TODO_LIST': {
            return state.filter(td => td.id !== action.payload.todoListId)
        }
        case 'ADD_NEW_TODO_LIST':{
            return [...state, {id: action.payload.newId, title:action.payload.title, filter: 'all'}];
        }
        case 'RENAME_TODO_LIST': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.newTitle} : el)
        }
        default:
            return state;
    }
}

type todoListsReducerType = changeFilterTaskACType | removeTodoListACType | addNewTodoListsACType | renameTodoListACType

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
export const addNewTodoListsAC = (title: string,newId:string) => {
    return {
        type: 'ADD_NEW_TODO_LIST',
        payload: {title,newId}
    } as const
}
type renameTodoListACType = ReturnType<typeof renameTodoListAC>
export const renameTodoListAC = (newTitle: string,todoListId:string) => {
    return {
        type: 'RENAME_TODO_LIST',
        payload: {newTitle,todoListId}
    } as const
}
