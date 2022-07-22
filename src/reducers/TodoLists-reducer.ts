import {todoListsApi, TodoListType} from '../api/API';
import {removeTodoListAndTasksAC} from './Tasks-reducer';
import {requestStatusType, setStatusApp} from './App-reducer';
import {AppThunk} from './store';


export type initialStateType = Array<TodoListDomainType>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & { filter: FilterValuesType, entityStatus: requestStatusType }

const initialState: initialStateType = []

export const todoListsReducer = (state: initialStateType = initialState, action: todoListsReducersType): initialStateType => {
    switch (action.type) {
        case 'CHANGE_FILTER_TODO_LIST': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, filter: action.payload.value} : el)
        }
        case 'CHANGE_STATUS_TODO_LIST': {
            return state.map(el => el.id === action.todoListId ? {...el, entityStatus: action.status} : el)
        }
        case 'REMOVE_TODO_LIST': {
            return state.filter(td => td.id !== action.payload.todoListId)
        }
        case 'ADD_NEW_TODO_LIST': {
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state,]
        }
        case 'RENAME_TODO_LIST': {
            return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.newTitle} : el)
        }
        case 'SET_TODO_LISTS': {
            return action.todoLists.map(el => {
                return {...el, filter: 'all', entityStatus: 'idle'}
            })
        }
        default:
            return state;
    }
}

export type todoListsReducersType = changeFilterTaskACType
    | removeTodoListACType
    | addNewTodoListsACType
    | renameTodoListACType
    | setTodoListsACType
    | changeTodoListStatusType

type changeFilterTaskACType = ReturnType<typeof changeFilterTaskAC>
export const changeFilterTaskAC = (value: FilterValuesType, todoListId: string) => {
    return {
        type: 'CHANGE_FILTER_TODO_LIST',
        payload: {value, todoListId}
    } as const
}
export type changeTodoListStatusType = ReturnType<typeof changeTodoListEntityStatus>
export const changeTodoListEntityStatus = (status: requestStatusType, todoListId: string) => {
    return {
        type: 'CHANGE_STATUS_TODO_LIST',
        status,
        todoListId
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
export const addNewTodoListsAC = (todoList: TodoListType) => {
    return {
        type: 'ADD_NEW_TODO_LIST',
        todoList
    } as const
}
type renameTodoListACType = ReturnType<typeof renameTodoListAC>
export const renameTodoListAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'RENAME_TODO_LIST',
        payload: {todoListId, newTitle}
    } as const
}

export type setTodoListsACType = ReturnType<typeof setTodoLists>
export const setTodoLists = (todoLists: TodoListType[]) => {
    return {
        type: 'SET_TODO_LISTS',
        todoLists
    } as const
}


export const fetchTodoListTC = (): AppThunk => async dispatch => {
    try {
        const resp = await todoListsApi.getTodoLists()
        dispatch(setTodoLists(resp.data))
    } catch (e: any) {
        console.log(e.message)
    }
}
export const addNewTodoListsTC = (title: string): AppThunk => async dispatch => {
    dispatch(setStatusApp('loading'))
    try {
        const resp = await todoListsApi.createTodoList(title)
        if (resp.resultCode === 0) {
            dispatch(addNewTodoListsAC(resp.data.item))
            dispatch(setStatusApp('succeeded'))
        }
    } catch (e: any) {
        console.log(e.message)
    }
}

export const removeTodoListTC = (todoId: string): AppThunk => async dispatch => {
    dispatch(changeTodoListEntityStatus('loading', todoId))
    dispatch(setStatusApp('loading'))
    try {
        const resp = await todoListsApi.deleteTodoList(todoId)
        if (resp.data.resultCode === 0) {
            dispatch(removeTodoListAC(todoId))
            dispatch(removeTodoListAndTasksAC(todoId))
            dispatch(setStatusApp('succeeded'))
        }
    } catch (e: any) {
        console.log(e.message)
    }
}

export const updateTodoListTC = (todoId: string, newTitle: string): AppThunk => async dispatch => {
    try {
        const resp = await todoListsApi.updateTodoList(todoId, newTitle)
        if (resp.data.resultCode === 0) {
            dispatch(renameTodoListAC(todoId, newTitle))
        }
    } catch (e: any) {
        console.log(e.message)
    }
}

