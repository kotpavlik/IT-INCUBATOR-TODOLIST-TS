import React from 'react';
import {action} from '@storybook/addon-actions'
import TodoList from './TodoList';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';
import {TaskPriorities, TaskStatuses} from '../../api/API';


export default {
    title: 'TodoList',
    component: TodoList,
    decorators:[ReduxStoreProviderDecorator]
}

const EditableSpanCallBack = action('')

export const AddItemFormBaseExample = () => {
    return <TodoList
        todolist={{id: 'todoList1',filter:'all',order:0,addedDate:'',title:'hello',entityStatus:'idle'}}
                     tasks={[
                         {id: '1', title: 'Bread', status:TaskStatuses.Completed,
                             description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'tasksID_2',order:0,addedDate:''},
                         {id: '2', title: 'Milk', status:TaskStatuses.New,
                             description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'tasksID_2',order:0,addedDate:''}]
    } />
}