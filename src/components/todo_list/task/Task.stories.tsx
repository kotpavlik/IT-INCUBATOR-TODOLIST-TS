import React from 'react';
import {action} from '@storybook/addon-actions'
import { Task } from './Task';
import { ReduxStoreProviderDecorator } from '../../stories/ReduxStoreProviderDecorator';



export default {
    title: 'TaskComponent',
    component: Task,
    decorators:[ReduxStoreProviderDecorator]
}

const EditableSpanCallBack = action('')

export const AddItemFormBaseExample = () => {
    return <>
        <Task title={'HTML'} isDone={true} id={'1'} todoId={'todoListId1'}/>
        <Task title={'CSS'} isDone={false} id={'2'} todoId={'todoListId1'}/>
        <Task title={'Bread'} isDone={true} id={'3'} todoId={'todoListId2'}/>
    </>



}