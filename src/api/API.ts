import axios from "axios";

const settings_api = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    headers: {
        "api-key": "d29f106d-431e-4e24-b36e-8c4bcc59630f"
    }
})

export type TodoListType = {
    id: string
    title:string
    addedDate:string
    order:number
}
type ResponseType<D> = {   // create generic for clarifies what to wright in data
    resultCode:number
    message:string[]
    data:D
}
type CreateTodoListDataType = {
    item: TodoListType
}



export const todoListsAp = {
    getTodoLists() {
        return settings_api.get<Array<TodoListType>>('todo-lists').then(response => {
            return response
        })
    },
    createTodoList(title:string) {
        return settings_api.post<ResponseType<CreateTodoListDataType>>('todo-lists', {title:title}).then(response => {
            return response
        })
    },
    deleteTodoList(id:string) {
        return settings_api.delete<ResponseType<{}>>(`todo-lists/${id}`).then(response => {
            return response
        })
    },
    updateTodoList(id:string,title:string){
        return settings_api.put<ResponseType<{}>>(`todo-lists/${id}`,{title:title}).then(response => {
            return response
        })
    }
}
