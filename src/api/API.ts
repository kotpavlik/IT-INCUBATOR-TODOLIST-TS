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
    messages:string[]
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
    data:{
        item:TaskType
    }
    resultCode:number
    messages:string[]
}
export type ModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type LoginType = {
    email:string
    password:string
    rememberMe:boolean
    captcha?:string
}
type DataForLoginType = {
    userId: number
}


export const todoListsApi = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>('todo-lists').then(response => {
            return response
        })
    },
    createTodoList(title:string) {
        return instance.post<CreateTodoListDataType>('todo-lists', {title:title}).then(response => {
            return response.data
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

export const loginApi = {
    login(data:LoginType) {
        return instance.post<ResponseType<DataForLoginType>>('/auth/login', data).then(response => {
            return response
        })
    },
    logout() {
        return instance.delete<ResponseType<{}>>('/auth/login').then(response => {
            return response.data
        })
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<{url:string}>(`/security/get-captcha-url`).then(response => {
            return response
        });
    }
}
