import {TasksObjType} from '../App';
import {v1} from 'uuid';
import {tasksID_1, tasksID_2} from './TodoLists-reducer';

type initialState = TasksObjType
const initialState:initialState = {
    [tasksID_1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
    ],
    [tasksID_2]: [
        {id: v1(), title: 'Bread', isDone: true},
        {id: v1(), title: 'Milk', isDone: false}
    ]}

export const tasksReducer = (state: TasksObjType = initialState, action: tasksReducerACType): TasksObjType => {
    switch (action.type) {
        case 'REMOVE_TASKS': {
            let tasks = state[action.payload.todoListId];
            state[action.payload.todoListId] = tasks.filter((el) => el.id !== action.payload.id);
            return {...state}
        }
        case 'ADD_TASKS': {
            return {
                ...state, [action.payload.todoListId]: [
                    ...state[action.payload.todoListId], {id: v1(), title: action.payload.taskName, isDone: false}
                ]
            }
        }
        case 'CHANGE_IS_DONE_TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)
            }
        }
        case 'REMOVE_TODO_LIST_AND_TASKS': {
            delete state[action.payload.todoListId];
            return  {...state}
        }
        case 'ADD_NEW_TODO_LIST_AND_TASKS' : {
          return {...state, [action.payload.id]: []};
        }
        case 'RENAME_TASKS': {
            return {
                ...state,
                [action.payload.todoListId]:
                    state[action.payload.todoListId]
                        .map(el => el.id === action.payload.taskId ? {...el, title:action.payload.newTitle} : el)
            }
        }
        default:
            return state;
    }
}

type tasksReducerACType = removeTasksACType | addTasksACType | changeIsDoneTaskAC |
    removeTodoListAndTasksACType | addNewTodoListsAndTasksACType | renameTasksACType
type removeTasksACType = ReturnType<typeof removeTasksAC>
export const removeTasksAC = (id: string, todoListId: string) => {
    return {
        type: 'REMOVE_TASKS',
        payload: {id, todoListId}
    } as const
}

type addTasksACType = ReturnType<typeof addTasksAC>
export const addTasksAC = (taskName: string, todoListId: string) => {
    return {
        type: 'ADD_TASKS',
        payload: {taskName, todoListId}
    } as const
}

type changeIsDoneTaskAC = ReturnType<typeof changeIsDoneTaskAC>
export const changeIsDoneTaskAC = (taskId: string, isDone: boolean, todoListId: string) => {
    return {
        type: 'CHANGE_IS_DONE_TASK',
        payload: {taskId, isDone, todoListId}
    } as const
}

type removeTodoListAndTasksACType = ReturnType<typeof removeTodoListAndTasksAC>
export const removeTodoListAndTasksAC = (todoListId:string) => {
    return {
        type: 'REMOVE_TODO_LIST_AND_TASKS',
        payload: {todoListId}
    } as const
}

type addNewTodoListsAndTasksACType = ReturnType<typeof addNewTodoListsAndTasksAC>
export const addNewTodoListsAndTasksAC =(id:string)=> {
    return {
        type: 'ADD_NEW_TODO_LIST_AND_TASKS',
        payload: {id}
    } as const
}

type renameTasksACType = ReturnType<typeof renameTasksAC>
export const renameTasksAC =(newTitle:string,taskId:string,todoListId:string)=> {
    return {
        type: 'RENAME_TASKS',
        payload: {newTitle,taskId,todoListId}
    } as const
}

