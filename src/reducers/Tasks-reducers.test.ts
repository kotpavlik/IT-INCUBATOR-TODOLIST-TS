import {v1} from 'uuid';
import {
    addNewTodoListsAndTasksAC,
    addTasksAC,
    changeIsDoneTaskAC,
    removeTasksAC,
    removeTodoListAndTasksAC, renameTasksAC,
    tasksReducer
} from './Tasks-reducer';
import {TasksObjType} from '../App';


test('remove tasks with copy state', () => {
    const tasksID_1 = v1();
    const tasksID_2 = v1();
    const initialState:TasksObjType = {
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
    let id = initialState[tasksID_1][0].id ;
    let todoListId = tasksID_1;

    const action = removeTasksAC(id,todoListId)
     const finishState = tasksReducer(initialState,action)

    expect(initialState).not.toBe(finishState);
    expect(finishState[tasksID_1][0].title).toBe('CSS');
    expect(finishState[tasksID_1].length).toBe(4);

});
test('add task', () => {
    const tasksID_1 = v1();
    const tasksID_2 = v1();
    const initialState:TasksObjType = {
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
    let taskName = 'new task name';
    let todoListId = tasksID_1;

    const action = addTasksAC(taskName,todoListId)
    const finishState = tasksReducer(initialState,action)

    expect(finishState[tasksID_1].length).toBe(initialState[tasksID_1].length + 1)
    expect(finishState[tasksID_1][5].title).toBe('new task name')
    expect(finishState[tasksID_1][5].isDone).not.toBe(true)
})
test('correct change isDone of task ', () => {
    const tasksID_1 = v1();
    const tasksID_2 = v1();
    const initialState:TasksObjType = {
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
    let isDone = false;
    let taskId = initialState[tasksID_1][0].id
    let todoListId = tasksID_1;

    const action = changeIsDoneTaskAC(taskId,isDone,todoListId)
    const finishState = tasksReducer(initialState,action)


    expect(finishState[tasksID_1][0].isDone).toBe(false)
})
test('deleted todo list and all tasks ', () => {
    const tasksID_1 = v1();
    const tasksID_2 = v1();
    const initialState:TasksObjType = {
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


    let todoListId = tasksID_1;

    const action = removeTodoListAndTasksAC(todoListId)
    const finishState = tasksReducer(initialState,action)


    expect(finishState[tasksID_1]).toBe(undefined)
    expect(finishState[tasksID_2]).not.toBe( [
        {id: v1(), title: 'Bread', isDone: true},
        {id: v1(), title: 'Milk', isDone: false}
    ])
})
test('added new todo list and empty tasks ', () => {
    const tasksID_1 = v1();
    const tasksID_2 = v1();
    const newTaskId = v1();
    const initialState:TasksObjType = {
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


    let todoListId = newTaskId;

    const action = addNewTodoListsAndTasksAC(todoListId)
    const finishState = tasksReducer(initialState,action)


    expect(finishState[todoListId].length).toBe(0)

})
test('correct rename tasks ', () => {
    const tasksID_1 = v1();
    const tasksID_2 = v1();

    const initialState:TasksObjType = {
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


    let newTitle = 'new Title';
    let taskId = initialState[tasksID_2][0].id;
    let todoListId = tasksID_2

    const action = renameTasksAC(newTitle,taskId,todoListId)
    const finishState = tasksReducer(initialState,action)


    expect(finishState[todoListId][0].title).toBe(newTitle)

})
