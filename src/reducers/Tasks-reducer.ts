
import {ModelType, TaskStatuses, TaskType, todoListsApi} from '../api/API';
import { setTodoListsACType} from './TodoLists-reducer';
import {Dispatch} from 'redux';
import {AppStateType} from './store';
import {setErrorApp, setStatusApp} from './App-reducer';


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
            return {...state,
                 [action.task.todoListId]: [
                     action.task,...state[action.task.todoListId]]
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

        case 'RENAME_TASKS': {
            debugger
            return {
                ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId]
                        .map(el => el.id === action.payload.taskId ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case 'SET_TASKS': {
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
export const changeIsDoneTaskAC = (todoListId: string,taskId: string, isDone: boolean, ) => {
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


export type renameTasksACType = ReturnType<typeof renameTasksAC>
export const renameTasksAC = (todoListId: string,taskId: string,newTitle:string) => {
    return {
        type: 'RENAME_TASKS',
        payload: {todoListId, taskId, newTitle}
    } as const
}

export type setTasksType = ReturnType<typeof setTasks>
export const setTasks = (tasks: Array<TaskType>, todoListId: string) => {
    return {
        type: 'SET_TASKS',
        tasks,
        todoListId
    } as const
}


export const fetchTasksTC = (todoId:string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusApp('loading'))
        todoListsApi.getTask(todoId)
            .then((resp) => {
                dispatch(setTasks(resp.data.items,todoId))
                dispatch(setStatusApp('succeeded'))
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
        dispatch(setStatusApp('loading'))
        todoListsApi.createTask(todoListId,title).then((res) => {
            if(res.data.resultCode === 0 ) {
                dispatch(addTasksAC(res.data.data.item))
                dispatch(setStatusApp('succeeded'))
            } else {
                dispatch(setErrorApp(res.data.messages[0]))
                dispatch(setStatusApp('failed'))
            }
        })
    }
}



export const changeIsDoneTaskTC = (todoListId: string,taskId: string,isDone: boolean) => {
    return (dispatch:Dispatch,getState: () => AppStateType) => {
        const state = getState();
        const task = state.tasks[todoListId].find(task => task.id === taskId)
        if(!task){
            throw new Error('task not founded in your state')
            return;
        }


        const modelUpdateTask:ModelType = {
            title: task.title,
            description: task.description,
            status: isDone ? TaskStatuses.Completed : TaskStatuses.New,
            priority: task.priority,
            startDate:task.startDate,
            deadline: task.deadline
        }
        todoListsApi.updateTask(todoListId,taskId,modelUpdateTask).then((res) => {
            dispatch(changeIsDoneTaskAC(todoListId,taskId,isDone));
        })
    }
}

export const renameTaskTC = (todoListId: string,taskId: string,newTitle: string) => {
    return (dispatch:Dispatch,getState: () => AppStateType) => {
        const state = getState();
        const task = state.tasks[todoListId].find(task => task.id === taskId)
        if(!task){
            throw new Error('task not founded in your state')
            return;
        }
        const modelUpdateTask:ModelType = {
            title: newTitle,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate:task.startDate,
            deadline: task.deadline
        }
        todoListsApi.updateTask(todoListId,taskId,modelUpdateTask).then((res) => {
            dispatch(renameTasksAC(todoListId,taskId,newTitle));
        })
    }
}

