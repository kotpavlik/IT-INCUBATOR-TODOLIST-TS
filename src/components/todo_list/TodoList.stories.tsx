import React from 'react';
import {action} from '@storybook/addon-actions'
import TodoList from './TodoList';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/API';


export default {
    title: 'TodoList',
    component: TodoList,
    decorators:[ReduxStoreProviderDecorator]
}

const EditableSpanCallBack = action('')

export const AddItemFormBaseExample = () => {
    return <TodoList todoId={'todoList1'}
                     tasks={[
                         {id: '1', title: 'Bread', status:TaskStatuses.Completed,
                             description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'tasksID_2',order:0,addedDate:''},
                         {id: '2', title: 'Milk', status:TaskStatuses.New,
                             description:'',priority:TaskPriorities.Low,startDate:'',deadline:'',todoListId:'tasksID_2',order:0,addedDate:''}]
    } filter={'all'} title={'hello'}/>
}