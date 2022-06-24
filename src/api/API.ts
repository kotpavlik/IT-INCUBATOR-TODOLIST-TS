import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        "api-key": "d29f106d-431e-4e24-b36e-8c4bcc59630f"
    }
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    ...settings

})
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TodoListType = {
    id: string
    title:string
    addedDate:string
    order:number
}
export type ResponseType<D = {}> = {   // create generic for clarifies what to wright in data. If <D> undefined then <D = {} >
    resultCode:number
    message:string[]
    data:D
}
export type CreateTodoListDataType = {
    data: {
        item: TodoListType
    }
    resultCode:number
    messages:string[]
}
export type TaskType = {
    description: string
    title:string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type getTasksType = {
    items:TaskType[]
    totalCount:number
    error:string
}
export type CreateUpdateTaskType = {
    data:TaskType
    resultCode:number
    messages:string[]
}
export type ModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todoListsAp = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>('todo-lists').then(response => {
            return response
        })
    },
    createTodoList(title:string) {
        return instance.post<ResponseType<CreateTodoListDataType>>('todo-lists', {title:title}).then(response => {
            return response
        })
    },
    deleteTodoList(id:string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`).then(response => {
            return response
        })
    },
    updateTodoList(id:string,title:string){
        return instance.put<ResponseType>(`todo-lists/${id}`,{title:title}).then(response => {
            return response
        })
    },
    getTask(todoListId:string){
        return instance.get<getTasksType>(`/todo-lists/${todoListId}/tasks`).then(response => {
            return response
        })
    },
    createTask(todoListId:string,title:string){
        return instance.post<CreateUpdateTaskType>(`/todo-lists/${todoListId}/tasks`, {title:title}).then(response => {
            return response
        })
    },
    updateTask(todoListId:string,taskId:string,model:ModelType){
        return instance.put<CreateUpdateTaskType>(`/todo-lists/${todoListId}/tasks/${taskId}`,{model}).then(response => {
            return response
        })
    },
    deleteTask(todoListId:string,taskId:string){
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`).then(response => {
            return response
        })
    },
}
