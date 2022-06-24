import {v1} from 'uuid';
import {
 addNewTodoListsAC,
 changeFilterTaskAC,
 removeTodoListAC,
 renameTodoListAC, TodoListDomainType,
 todoListsReducer
} from './TodoLists-reducer';





test('correct change filter',()=>{
 const tasksID_1 = v1();
 const tasksID_2 = v1();

 let initialStateTDL:Array<TodoListDomainType> = [
  {id: tasksID_1, title: 'What learn', filter: 'all', addedDate:'', order:0},
  {id: tasksID_2, title: 'What buy', filter: 'all', addedDate:'', order:0}
 ]

 const value = 'active' ;
 const todoListId = tasksID_2 ;

 const action = changeFilterTaskAC(value,todoListId);

 const finalState = todoListsReducer(initialStateTDL,action)

 expect(finalState[1].filter).toBe(value)
 expect(finalState[1].filter).not.toBe(initialStateTDL[1].filter)
})
test('correct remove todo list', () => {
 const tasksID_1 = v1();
 const tasksID_2 = v1();

 const initialStateTDL:Array<TodoListDomainType> = [
  {id: tasksID_1, title: 'What learn', filter: 'all', addedDate:'', order:0},
  {id: tasksID_2, title: 'What buy', filter: 'all', addedDate:'', order:0}
 ]
 const todoListId = tasksID_2 ;
 const action = removeTodoListAC(todoListId);
 const finalState = todoListsReducer(initialStateTDL,action)

 expect(finalState.length).not.toBe(initialStateTDL.length)
 expect(finalState.length === 1).toBe(true)
 expect(finalState[1]).toBe(undefined)
})
test('correct add new todo list', () => {
 const tasksID_1 = v1();
 const tasksID_2 = v1();

 const initialStateTDL:Array<TodoListDomainType> = [
  {id: tasksID_1, title: 'What learn', filter: 'all', addedDate:'', order:0},
  {id: tasksID_2, title: 'What buy', filter: 'all', addedDate:'', order:0}
 ]
 const title = 'new title'
 const newId = v1();
 const action = addNewTodoListsAC(title,newId);
 const finalState = todoListsReducer(initialStateTDL,action)

 expect(finalState.length).not.toBe(initialStateTDL.length)
 expect(finalState.length === 3).toBe(true)
 expect(finalState[2].title).toBe(title)
 expect(finalState[2].id).toBe(newId)
})
test('correct rename todo list', () => {
 const tasksID_1 = v1();
 const tasksID_2 = v1();

 const initialStateTDL:Array<TodoListDomainType> = [
  {id: tasksID_1, title: 'What learn', filter: 'all', addedDate:'', order:0},
  {id: tasksID_2, title: 'What buy', filter: 'all', addedDate:'', order:0}
 ]
 const newTitle = 'rename title'
 const todoListId = tasksID_1;
 const action = renameTodoListAC(newTitle,todoListId);
 const finalState = todoListsReducer(initialStateTDL,action)

 expect(finalState).not.toBe(initialStateTDL)
 expect(finalState[0].title).toBe(newTitle)
 expect(finalState.length === 2).toBe(true)

})

