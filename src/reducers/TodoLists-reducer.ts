import {todoListsApi, TodoListType} from '../api/API';
import {removeTodoListAndTasksAC} from './Tasks-reducer';
import {requestStatusType, setErrorApp, setStatusApp} from './App-reducer';
import {AppThunk} from './store';
import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export type initialStateType = Array<TodoListDomainType>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & { filter: FilterValuesType, entityStatus: requestStatusType }

const initialState: initialStateType = []

const slice = createSlice({
    name: 'todoLists',
    initialState,
    reducers: {
        changeFilterTaskAC(state, action: PayloadAction<{ value: FilterValuesType, todoListId: string }>) {
            const index = state.findIndex(td => td.id === action.payload.todoListId)
            state[index].filter = action.payload.value
        },
        changeTodoListEntityStatus(state, action: PayloadAction<{ status: requestStatusType, todoListId: string }>) {
            const index = state.findIndex(td => td.id === action.payload.todoListId)
            state[index].entityStatus = action.payload.status
        },
        removeTodoListAC(state, action: PayloadAction<{ todoListId: string }>) {
           const index =  state.findIndex(td => td.id === action.payload.todoListId)
            if(index > -1) {
                state.splice(index,1)
            }
        },
        addNewTodoListsAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },
        renameTodoListAC(state, action: PayloadAction<{ todoListId: string, newTitle: string }>) {
            const index = state.findIndex(td => td.id === action.payload.todoListId)
            state[index].title = action.payload.newTitle
        },
        setTodoLists(state, action: PayloadAction<{ todoLists: TodoListType[] }>) {
            return action.payload.todoLists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        }

    }
})

export const todoListsReducer = slice.reducer;
export const {
    changeFilterTaskAC,
    changeTodoListEntityStatus,
    removeTodoListAC, addNewTodoListsAC,
    renameTodoListAC, setTodoLists
} = slice.actions;
// (state: initialStateType = initialState, action: todoListsReducersType): initialStateType => {
//     switch (action.type) {
//         case 'CHANGE_FILTER_TODO_LIST': {
//             return state.map(el => el.id === action.payload.todoListId ? {...el, filter: action.payload.value} : el)
//         }
//         case 'CHANGE_STATUS_TODO_LIST': {
//             return state.map(el => el.id === action.todoListId ? {...el, entityStatus: action.status} : el)
//         }
//         case 'REMOVE_TODO_LIST': {
//             return state.filter(td => td.id !== action.payload.todoListId)
//         }
//         case 'ADD_NEW_TODO_LIST': {
//             return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state,]
//         }
//         case 'RENAME_TODO_LIST': {
//             return state.map(el => el.id === action.payload.todoListId ? {...el, title: action.payload.newTitle} : el)
//         }
//         case 'SET_TODO_LISTS': {
//             return action.todoLists.map(el => {
//                 return {...el, filter: 'all', entityStatus: 'idle'}
//             })
//         }
//         default:
//             return state;
//     }
// }
export type changeFilterTaskACType = ReturnType<typeof changeFilterTaskAC>
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addNewTodoListsACType = ReturnType<typeof addNewTodoListsAC>
export type setTodoListsACType = ReturnType<typeof setTodoLists>
export type changeTodoListStatusType = ReturnType<typeof changeTodoListEntityStatus>
export type renameTodoListACType = ReturnType<typeof renameTodoListAC>
export type todoListsReducersType = changeFilterTaskACType
    | removeTodoListACType
    | addNewTodoListsACType
    | renameTodoListACType
    | setTodoListsACType
    | changeTodoListStatusType


export const fetchTodoListTC = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        const resp = await todoListsApi.getTodoLists()
        dispatch(setTodoLists({todoLists:resp.data}))
    } catch (e: any) {
        dispatch(setErrorApp({error: e.messages}))
    }
}
export const addNewTodoListsTC = (title: string): AppThunk => async (dispatch: Dispatch) => {
    dispatch(setStatusApp({status: 'loading'}))
    try {
        const resp = await todoListsApi.createTodoList(title)
        if (resp.resultCode === 0) {
            dispatch(addNewTodoListsAC({todoList:resp.data.item}))
            dispatch(setStatusApp({status: 'succeeded'}))
        }
        dispatch(setErrorApp({error: resp.messages[0]}))
        dispatch(setStatusApp({status: 'failed'}))
    } catch (e: any) {
        dispatch(setErrorApp({error: e.messages}))
    }
}

export const removeTodoListTC = (todoId: string): AppThunk => async (dispatch: Dispatch) => {
    dispatch(changeTodoListEntityStatus({status:'loading',todoListId: todoId}))
    dispatch(setStatusApp({status: 'loading'}))
    try {
        const resp = await todoListsApi.deleteTodoList(todoId)
        if (resp.data.resultCode === 0) {
            dispatch(removeTodoListAC({todoListId:todoId}))
            dispatch(removeTodoListAndTasksAC({todoListId:todoId}))
            dispatch(setStatusApp({status: 'succeeded'}))
        }
    } catch (e: any) {
        dispatch(setErrorApp({error: e.messages}))
    }
}

export const updateTodoListTC = (todoId: string, newTitle: string): AppThunk => async (dispatch: Dispatch) => {
    try {
        const resp = await todoListsApi.updateTodoList(todoId, newTitle)
        if (resp.data.resultCode === 0) {
            dispatch(renameTodoListAC({todoListId:todoId,newTitle}))
        }
    } catch (e: any) {
        dispatch(setErrorApp({error: e.messages}))
    }
}

