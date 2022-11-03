import {ModelType, TaskStatuses, TaskType, todoListsApi} from '../api/API';
import {AppStateType, AppThunk} from './store';
import {setErrorApp, setStatusApp} from './App-reducer';
import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';



export type TasksObjType = {
    [key: string]: Array<TaskType>
}
type initialStateType = TasksObjType


const initialState: initialStateType = {}

export const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers:{
        removeTasksAC(state,action:PayloadAction<{todoListId: string, id: string}>) {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex( t => t.id === action.payload.id);
            if(index > -1) {
                tasks.splice(index,1)
            }
        },
        addTasksAC(state,action:PayloadAction<{task: TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        changeIsDoneTaskAC(state,action:PayloadAction<{todoListId: string, taskId: string, isDone: boolean}>) {
           const tasks = state[action.payload.todoListId];
           const index = tasks.findIndex(t => t.id === action.payload.taskId);
           if(index > -1) {
               tasks[index].status = action.payload.isDone ? TaskStatuses.Completed : TaskStatuses.New
           }
        },
        removeTodoListAndTasksAC(state,action:PayloadAction<{todoListId: string}>) {
            delete state[action.payload.todoListId]
        },
        renameTasksAC(state,action:PayloadAction<{todoListId: string, taskId: string, newTitle: string}>) {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if(index > -1) {
                tasks[index].title = action.payload.newTitle
            }
        },
        setTasks(state,action:PayloadAction<{tasks: Array<TaskType>, todoListId: string}>) {
            state[action.payload.todoListId] = action.payload.tasks
        }
    }
})

export const tasksReducer = slice.reducer;
export const {removeTasksAC,addTasksAC,changeIsDoneTaskAC,removeTodoListAndTasksAC,renameTasksAC,setTasks} = slice.actions;
// (state: initialStateType = initialState, action: tasksReducersACType): initialStateType => {
//     switch (action.type) {
//         case 'REMOVE_TASKS': {
//             return {
//                 ...state,
//                 [action.payload.todoListId]: state[action.payload.todoListId].filter((el) => el.id !== action.payload.id)
//             }
//         }
//         case 'ADD_TASKS': {
//             return {
//                 ...state,
//                 [action.task.todoListId]: [
//                     action.task, ...state[action.task.todoListId]]
//             }
//         }
//         case 'CHANGE_IS_DONE_TASK': {
//             return {
//                 ...state,
//                 [action.payload.todoListId]: state[action.payload.todoListId]
//                     .map(el => el.id === action.payload.taskId ? {
//                         ...el,
//                         status: action.payload.isDone ? TaskStatuses.Completed : TaskStatuses.New
//                     } : el)
//             }
//         }
//         case 'REMOVE_TODO_LIST_AND_TASKS': {
//             delete state[action.payload.todoListId];
//             return {...state}
//         }
//
//         case 'RENAME_TASKS': {
//             return {
//                 ...state,
//                 [action.payload.todoListId]:
//                     state[action.payload.todoListId]
//                         .map(el => el.id === action.payload.taskId ? {...el, title: action.payload.newTitle} : el)
//             }
//         }
//         case 'SET_TASKS': {
//             const copyState = {...state}
//             copyState[action.todoListId] = action.tasks
//             return copyState
//         }
//         default:
//             return state;
//     }
// }

export type removeTasksACType = ReturnType<typeof removeTasksAC>
export type addTasksACType = ReturnType<typeof addTasksAC>
export type changeIsDoneTaskACType = ReturnType<typeof changeIsDoneTaskAC>
export type removeTodoListAndTasksACType = ReturnType<typeof removeTodoListAndTasksAC>
export type renameTasksACType = ReturnType<typeof renameTasksAC>
export type setTasksType = ReturnType<typeof setTasks>
export type tasksReducersACType = removeTasksACType |
    addTasksACType | changeIsDoneTaskACType | removeTodoListAndTasksACType |
    renameTasksACType | setTasksType




export const fetchTasksTC = (todoId: string): AppThunk => async (dispatch:Dispatch) => {
    dispatch(setStatusApp({status:'loading'}))
    try {
        const resp = await todoListsApi.getTask(todoId)
        dispatch(setTasks({tasks:resp.data.items, todoListId:todoId}))
        dispatch(setStatusApp({status:'succeeded'}))
    } catch (e: any) {
        dispatch(setErrorApp({error:e.messages}))
    }
}

export const deleteTaskTC = (todoListId: string, id: string): AppThunk => async (dispatch:Dispatch) => {
    try {
        await todoListsApi.deleteTask(todoListId, id)
        dispatch(removeTasksAC({todoListId, id}))
    } catch (e: any) {
        dispatch(setErrorApp({error:e.message}))
    }
}

export const addTaskTC = (todoListId: string, title: string): AppThunk => async (dispatch:Dispatch) => {
    dispatch(setStatusApp({status:'loading'}))
    try {
        const res = await todoListsApi.createTask(todoListId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTasksAC({task:res.data.data.item}))
            dispatch(setStatusApp({status:'succeeded'}))
        } else {
            dispatch(setErrorApp({error:res.data.messages[0]}))
            dispatch(setStatusApp({status:'failed'}))
        }
    } catch (e: any) {
        dispatch(setErrorApp({error:e.messages}))
    }
}


export const changeIsDoneTaskTC = (todoListId: string, taskId: string, isDone: boolean): AppThunk => async (dispatch:Dispatch, getState: () => AppStateType) => {
    const state = await getState();
    const task = await state.tasks[todoListId].find(task => task.id === taskId)
    if (!task) {
        throw new Error('task not founded in your state')
    }
    const modelUpdateTask: ModelType = {
        title: task.title,
        description: task.description,
        status: isDone ? TaskStatuses.Completed : TaskStatuses.New,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    }
    try {
        await todoListsApi.updateTask(todoListId, taskId, modelUpdateTask)
        dispatch(changeIsDoneTaskAC({todoListId, taskId, isDone}));
    } catch (e: any) {
        dispatch(setErrorApp({error:e.messages}))
    }
}


export const renameTaskTC = (todoListId: string, taskId: string, newTitle: string): AppThunk => async (dispatch:Dispatch, getState: () => AppStateType) => {
    const state = await getState();
    const task = await state.tasks[todoListId].find(task => task.id === taskId)
    if (!task) {
        throw new Error('task not founded in your state')
    }
    const modelUpdateTask: ModelType = {
        title: newTitle,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    }
    try {
        await todoListsApi.updateTask(todoListId, taskId, modelUpdateTask)
        dispatch(renameTasksAC({todoListId, taskId, newTitle}));
    } catch (e: any) {
        dispatch(setErrorApp({error:e.messages}))
    }
}


