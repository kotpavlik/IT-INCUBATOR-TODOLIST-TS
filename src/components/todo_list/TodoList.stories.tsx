import React from 'react';
import {action} from '@storybook/addon-actions'
import TodoList from './TodoList';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';


export default {
    title: 'TodoList',
    component: TodoList,
    decorators:[ReduxStoreProviderDecorator]
}

const EditableSpanCallBack = action('')

export const AddItemFormBaseExample = () => {
    return <TodoList todoId={'todoList1'}
                     tasks={[
                         {id: '1', isDone: true, title: 'HTML'},
                         {id: '2', isDone: false, title: 'CSS'}]
    } filter={'all'} title={'hello'}/>
}