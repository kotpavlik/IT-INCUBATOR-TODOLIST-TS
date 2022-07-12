
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi} from '../api/API';
import { setTodoListsACType} from './TodoLists-reducer';
import {Dispatch} from 'redux';


export type TasksObjType = {
    [key: string]: Array<TaskType>
}
type initialStateType = TasksObjType


const initialState: initialStateType = {}

export const tasksReducer = (state: initialStateType = initialState, action: tasksReducerACType): initialStateType => {
    switch (action.type) {
        case 'REMOVE_TASKS': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter((el) => el.id !== action.payload.id)
            }
        }
        case 'ADD_TASKS': {
            debugger
            return {
                ...state, [action.task.todoListId]: [
                    ...state[action.task.todoListId], action.task]
            }
        }
        case 'CHANGE_IS_DONE_TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(el => el.id === action.payload.taskId ? {
                        ...el,
                        status: action.payload.isDone ? TaskStatuses.Completed : TaskStatuses.New
                    } : el)
            }
        }
        case 'REMOVE_TODO_LIST_AND_TASKS': {
            delete state[action.payload.todoListId];
            return {...state}
        }
        case 'ADD_NEW_TODO_LIST_AND_TASKS' : {
            return {...state, [action.payload.id]: []};
        }
        case 'RENAME_TASKS': {
            return {
                ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId]
                        .map(el => el.id === action.payload.taskId ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case 'SET_TODO_LISTS': {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case 'SET_TASKS': {
            debugger
            const copyState = {...state}
                copyState[action.todoListId] = action.tasks
            return copyState
        }
      default:
            return state;
    }
}

type tasksReducerACType = removeTasksACType
    | addTasksACType
    | changeIsDoneTaskACType
    | removeTodoListAndTasksACType
    | addNewTodoListsAndTasksACType
    | renameTasksACType
    | setTodoListsACType
    | setTasksType

export type removeTasksACType = ReturnType<typeof removeTasksAC>
export const removeTasksAC = ( todoListId: string,id: string) => {
    return {
        type: 'REMOVE_TASKS',
        payload: {id, todoListId}
    } as const
}

export type addTasksACType = ReturnType<typeof addTasksAC>
export const addTasksAC = (task:TaskType) => {
    return {
        type: 'ADD_TASKS',
        task
    } as const
}

export type changeIsDoneTaskACType = ReturnType<typeof changeIsDoneTaskAC>
export const changeIsDoneTaskAC = (taskId: string, isDone: boolean, todoListId: string) => {
    return {
        type: 'CHANGE_IS_DONE_TASK',
        payload: {taskId, isDone, todoListId}
    } as const
}

export type removeTodoListAndTasksACType = ReturnType<typeof removeTodoListAndTasksAC>
export const removeTodoListAndTasksAC = (todoListId: string) => {
    return {
        type: 'REMOVE_TODO_LIST_AND_TASKS',
        payload: {todoListId}
    } as const
}

export type addNewTodoListsAndTasksACType = ReturnType<typeof addNewTodoListsAndTasksAC>
export const addNewTodoListsAndTasksAC = (id: string) => {
    return {
        type: 'ADD_NEW_TODO_LIST_AND_TASKS',
        payload: {id}
    } as const
}

export type renameTasksACType = ReturnType<typeof renameTasksAC>
export const renameTasksAC = (newTitle: string, taskId: string, todoListId: string) => {
    return {
        type: 'RENAME_TASKS',
        payload: {newTitle, taskId, todoListId}
    } as const
}

export type setTasksType = ReturnType<typeof setTasks>
export const setTasks = (tasks: Array<TaskType>, todoListId: string) => {
    debugger
    return {
        type: 'SET_TASKS',
        tasks,
        todoListId
    } as const
}


export const fetchTasksTC = (todoId:string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.getTask(todoId)
            .then((resp) => {
                dispatch(setTasks(resp.data.items,todoId))
            })
    }
}
export const deleteTaskTC = (todoListId:string,id:string) => {
    return (dispatch:Dispatch) => {
        todoListsApi.deleteTask(todoListId,id).then((res) => {
           dispatch(removeTasksAC(todoListId,id))
        })
    }
}
export const addTaskTC = (todoListId:string,title:string) => {
    return (dispatch:Dispatch) => {
        todoListsApi.createTask(todoListId,title).then((res) => {
            debugger
            dispatch(addTasksAC(res.data.data.item));
        })
    }
}

