import {v1} from 'uuid';
import {
    addNewTodoListsAndTasksAC,
    addTasksAC,
    changeIsDoneTaskAC,
    removeTasksAC,
    removeTodoListAndTasksAC, renameTasksAC, setTasks, TasksObjType,
    tasksReducer
} from './Tasks-reducer';
import {TaskPriorities, TaskStatuses} from '../api/API';
import {setTodoLists} from './TodoLists-reducer';


const tasksID_1 = v1();
const tasksID_2 = v1();
const initialState: TasksObjType = {
    [tasksID_1]: [
        {
            id: '1',
            title: 'HTML',
            status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'tasksID_1',
            order: 0,
            addedDate: ''
        },
        {
            id: v1(),
            title: 'CSS',
            status: TaskStatuses.New,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'tasksID_1',
            order: 0,
            addedDate: ''
        },
        {
            id:'2',
            title: 'JS',
            status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'tasksID_1',
            order: 0,
            addedDate: ''
        },
        {
            id: '3',
            title: 'React',
            status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'tasksID_1',
            order: 0,
            addedDate: ''
        },
        {
            id: '4',
            title: 'Redux',
            status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'tasksID_1',
            order: 0,
            addedDate: ''
        },
    ],
    [tasksID_2]: [
        {
            id: '1',
            title: 'Bread',
            status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'tasksID_2',
            order: 0,
            addedDate: ''
        },
        {
            id: '2',
            title: 'Milk',
            status: TaskStatuses.New,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'tasksID_2',
            order: 0,
            addedDate: ''
        }
    ]
}

test('remove task with copy state', () => {

    let id = initialState[tasksID_1][0].id;
    let todoListId = tasksID_1;

    const action = removeTasksAC(id, todoListId)
    const finishState = tasksReducer(initialState, action)

    expect(initialState).not.toBe(finishState);
    expect(finishState[tasksID_1][0].title).toBe('CSS');
    expect(finishState[tasksID_1].length).toBe(4);

});
test('add task', () => {

    let todoListId = tasksID_1;

    const action = addTasksAC({
        id:'1',
        title:'new task name',
        todoListId:`${todoListId}`,
        status:TaskStatuses.Completed,
        description:'',
        order:0,
        addedDate:'',
        priority:TaskPriorities.Low,
        startDate:'',
        deadline:''

    })
    const finishState = tasksReducer(initialState, action)

    expect(finishState[tasksID_1].length).toBe(initialState[tasksID_1].length + 1)
    expect(finishState[tasksID_1][5].title).toBe('new task name')
    expect(finishState[tasksID_1][5].status).toBe(TaskStatuses.Completed)
})
test('correct change isDone of task ', () => {

    let isDone = false;
    let taskId = initialState[tasksID_1][0].id
    let todoListId = tasksID_1;

    const action = changeIsDoneTaskAC(taskId, isDone, todoListId)
    const finishState = tasksReducer(initialState, action)


    expect(finishState[tasksID_1][0].status).toBe(0)
})
test('deleted todo list and all task ', () => {


    let todoListId = tasksID_1;

    const action = removeTodoListAndTasksAC(todoListId)
    const finishState = tasksReducer(initialState, action)


    expect(finishState[tasksID_1]).toBe(undefined)
    expect(finishState[tasksID_2]).not.toBe([
        {
            id: v1(),
            title: 'Bread',
            status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'tasksID_2',
            order: 0,
            addedDate: ''
        },
        {
            id: v1(),
            title: 'Milk',
            status: TaskStatuses.New,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'tasksID_2',
            order: 0,
            addedDate: ''
        }
    ])
})
test('added new todo list and empty task ', () => {

    const newTaskId = v1();
    let todoListId = newTaskId;
    const action = addNewTodoListsAndTasksAC(todoListId)
    const finishState = tasksReducer(initialState, action)


    expect(finishState[todoListId].length).toBe(0)

})
test('correct rename task ', () => {

    let newTitle = 'new Title';
    let taskId = initialState[tasksID_2][0].id;
    let todoListId = tasksID_2

    const action = renameTasksAC(newTitle, taskId, todoListId)
    const finishState = tasksReducer(initialState, action)


    expect(finishState[todoListId][0].title).toBe(newTitle)

})

test('added new todo list and empty task ', () => {


    const action = setTodoLists([
        {id: '1', title: 'new title', order: 0, addedDate: ''},
        {id: '2', title: 'new title_2', order: 0, addedDate: ''},
        {id: '3', title: 'new title_3', order: 0, addedDate: ''},
    ])
    const finishState = tasksReducer({}, action)
    const keys = Object.keys(finishState)

    expect(keys.length).toBe(3);
    expect(finishState['1']).toStrictEqual([]);
    expect(finishState['2']).toStrictEqual([]);


})

test('tasks should be added for todo lists', () => {


    const action = setTasks(initialState[tasksID_1]

        , tasksID_1)
    const finishState = tasksReducer({tasksID_1: [], 'tasksID_2': []}, action)


    expect(finishState[tasksID_1].length).toBe(5);
    expect(finishState['tasksID_2'].length).toBe(0);


})
