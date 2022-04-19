import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './components/todo_list/TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksObjType = {
    [key: string]: Array<TaskType>
}

function App() {

    const tasksID_1 = v1();
    const tasksID_2 = v1();
    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: tasksID_1, title: 'What learn', filter: 'all'},
        {id: tasksID_2, title: 'What buy', filter: 'all'}]);
    let [tasksObj, setTasksObj] = useState<TasksObjType>(
        {
            [tasksID_1]:[
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: false},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
            ],
            [tasksID_2]:[
                {id: v1(), title: 'Bread', isDone: true},
                {id: v1(), title: 'Milk', isDone: false}
            ]
        })

    function removeTasks(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter((el) => el.id !== id);
         tasksObj[todoListId] = filteredTasks;
        setTasksObj({...tasksObj});
    }
    function addTasks(taskName: string,todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task: TaskType = {id: v1(), title: taskName, isDone: false};
        let newTask = [...tasks, task]
        tasksObj[todoListId] = newTask;
        setTasksObj({...tasksObj});
    }
    function changeFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => {
            if (tl.id === todoListId) {
                return {...tl, filter: value}
            }
            return tl;
        }))
    }
    function changeIsDoneTask(taskId: string, isDone: boolean,todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        tasksObj[todoListId] = tasks;
        setTasksObj({...tasksObj})
    }
    function removeTodoList  (todoListId:string)  {
        let newTodoList = todoLists.filter( td => td.id !== todoListId )
        setTodoLists(newTodoList);
        delete tasksObj[todoListId];
        setTasksObj({...tasksObj});
    }



    return (
        <div className="App">
            {todoLists.map((tl) => {
                let tasksForTodoList = tasksObj[tl.id];
                if (tl.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter((el) => el.isDone === false);
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter((el) => el.isDone === true);
                }
                return (
                    <TodoList
                        key={tl.id}
                        todoId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        filter={tl.filter}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        addTasks={addTasks}
                        changeIsDoneTask={changeIsDoneTask}
                        removeTodoList={removeTodoList}
                    />

                )
            })}
        </div>
    );
}

export default App;
