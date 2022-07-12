import {v1} from 'uuid';
import {
 addNewTodoListsAC,
 changeFilterTaskAC,
 removeTodoListAC,
 renameTodoListAC, setTodoLists, TodoListDomainType,
 todoListsReducer
} from './TodoLists-reducer';
import {TodoListType} from '../api/API';

const tasksID_1 = v1();
const tasksID_2 = v1();
const initialStateTDL:Array<TodoListDomainType> = [
 {id: tasksID_1, title: 'What learn', filter: 'all', addedDate:'', order:0},
 {id: tasksID_2, title: 'What buy', filter: 'all', addedDate:'', order:0}
]



test('correct change filter',()=>{




 const value = 'active' ;
 const todoListId = tasksID_2 ;

 const action = changeFilterTaskAC(value,todoListId);

 const finalState = todoListsReducer(initialStateTDL,action)

 expect(finalState[1].filter).toBe(value)
 expect(finalState[1].filter).not.toBe(initialStateTDL[1].filter)
})
test('correct remove todo list', () => {

 const todoListId = tasksID_2 ;
 const action = removeTodoListAC(todoListId);
 const finalState = todoListsReducer(initialStateTDL,action)

 expect(finalState.length).not.toBe(initialStateTDL.length)
 expect(finalState.length === 1).toBe(true)
 expect(finalState[1]).toBe(undefined)
})
test('correct add new todo list', () => {

 const title = 'new title'
 const newId = 'dashka_kakashka'

 const action = addNewTodoListsAC({title:`${title}`,order:0,addedDate:'',id:`${newId}`});
 const finalState = todoListsReducer(initialStateTDL,action)

 expect(finalState.length).not.toBe(initialStateTDL.length)
 expect(finalState.length === 3).toBe(true)
 expect(finalState[2].title).toBe(title)
 expect(finalState[2].id).toBe(newId)
})
test('correct rename todo list', () => {

 const newTitle = 'rename title'
 const todoListId = tasksID_1;
 const action = renameTodoListAC(newTitle,todoListId);
 const finalState = todoListsReducer(initialStateTDL,action)

 expect(finalState).not.toBe(initialStateTDL)
 expect(finalState[0].title).toBe(newTitle)
 expect(finalState.length === 2).toBe(true)

})
test(' correct set todo lists test', () => {

const todoLists:TodoListType[] =  [
 {id:v1(),title:'new title',order:0,addedDate:''},
 {id:v1(),title:'new title_2',order:0,addedDate:''},
 {id:v1(),title:'new title_3',order:0,addedDate:''},
]

 const action = setTodoLists(todoLists);
 const finalState = todoListsReducer([],action)

 expect(finalState).not.toBe(todoLists)
 expect(finalState.length).toBe(3)


})

