import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './components/todo_list/TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './components/addItemForm/AddItemForm';
import {ExampleAnimation} from './components/lottie/LottieAnimation';


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

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>(
        () => {
            let newValue_todoLists = localStorage.getItem('value_todoLists');
            if (newValue_todoLists) {
                let new_start_value = JSON.parse(newValue_todoLists);
                return new_start_value ||
                    [{id: tasksID_1, title: 'What learn', filter: 'all'},
                        {id: tasksID_2, title: 'What buy', filter: 'all'}];
            }
        });
    let [tasksObj, setTasksObj] = useState<TasksObjType>(
        () => {
            let newValue_tasksObj = localStorage.getItem('value_tasks');
            if (newValue_tasksObj) {
                let new_start_value = JSON.parse(newValue_tasksObj);
                return new_start_value ||
                    {
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
                        ]
                    }
            }
        }
    );

    useEffect(() => {
        localStorage.setItem('value_todoLists', JSON.stringify(todoLists))
    }, [todoLists]);
    useEffect(() => {
        localStorage.setItem('value_tasks', JSON.stringify(tasksObj))
    }, [tasksObj]);

    function removeTasks(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter((el) => el.id !== id);
        tasksObj[todoListId] = filteredTasks;
        setTasksObj({...tasksObj});
    }

    function addTasks(taskName: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task: TaskType = {id: v1(), title: taskName, isDone: false};
        let newTask = [...tasks, task]
        tasksObj[todoListId] = newTask;
        setTasksObj({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, filter: value} : el))
        // setTodoLists(todoLists.map(tl => {
        //     if (tl.id === todoListId) {
        //         return {...tl, filter: value}
        //     }
        //     return tl;
        // }))
    }

    function changeIsDoneTask(taskId: string, isDone: boolean, todoListId: string) {
        // let tasks = tasksObj[todoListId];
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        // tasksObj[todoListId] = tasks;
        // setTasksObj({...tasksObj})
        setTasksObj({
            ...tasksObj,
            [todoListId]: tasksObj[todoListId].map(el => el.id === taskId ? {...el, isDone} : el)
        })
    }

    function removeTodoList(todoListId: string) {
        let newTodoList = todoLists.filter(td => td.id !== todoListId)
        setTodoLists(newTodoList);
        delete tasksObj[todoListId];
        setTasksObj({...tasksObj});
    }

    function addNewTodoLists(title: string) {
        let newTodoList: TodoListsType = {id: v1(), title, filter: 'all'};
        let addNewTodolist = [...todoLists, newTodoList];
        let addNewTasksObj = {...tasksObj, [newTodoList.id]: []};
        setTodoLists(addNewTodolist);
        setTasksObj(addNewTasksObj);
    }

    function renameTodoList(newTitle: string, todoListId: string) {
        setTodoLists(todoLists.map(el => el.id === todoListId ? {...el, title: newTitle} : el))
    }

    function renameTasks(newTitle: string, taskId: string, todoListId: string) {
        setTasksObj({
            ...tasksObj,
            [todoListId]: tasksObj[todoListId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })

    }


    return (
        <div className="App">

            <div className="title_plus_lottie">
                <div className="global_title"> YourToDo</div>
                <span><ExampleAnimation/></span>
            </div>
            <div className="addNewTodoLists">
                <AddItemForm addItem={addNewTodoLists} buttonName={'add'}/>
            </div>
            <div className="wrapper_global_all">

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
                            renameTodoList={renameTodoList}
                            renameTasks={renameTasks}
                        />
                    )
                })}</div>
        </div>
    );
}

export default App;
