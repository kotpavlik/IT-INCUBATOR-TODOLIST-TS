import axios from "axios";

const settings_api = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    headers: {
        "api-key": "d29f106d-431e-4e24-b36e-8c4bcc59630f"
    }
})

export const todoListsAp = {
    getTodoLists() {
        return settings_api.get('todo-lists').then(response => {
            return response
        })
    },
    createTodoList(title:string) {
        return settings_api.post('todo-lists', {title:title}).then(response => {
            return response
        })
    },
    deleteTodoList(id:string) {
        return settings_api.delete(`todo-lists/${id}`).then(response => {
            return response
        })
    },
    updateTodoList(id:string,title:string){
        return settings_api.put(`todo-lists/${id}`,{title:title}).then(response => {
            return response
        })
    }
}
