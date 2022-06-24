import React from 'react';
import {action} from '@storybook/addon-actions'
import { Task } from './Task';
import { ReduxStoreProviderDecorator } from '../../stories/ReduxStoreProviderDecorator';
import {TaskStatuses} from '../../../api/API';



export default {
    title: 'TaskComponent',
    component: Task,
    decorators:[ReduxStoreProviderDecorator]
}

const EditableSpanCallBack = action('')

export const AddItemFormBaseExample = () => {
    return <>
        <Task title={'HTML'} status={TaskStatuses.Completed} id={'1'} todoId={'todoListId1'}/>
        <Task title={'CSS'} status={TaskStatuses.New} id={'2'} todoId={'todoListId1'}/>
        <Task title={'Bread'} status={TaskStatuses.Completed} id={'3'} todoId={'todoListId2'}/>
    </>



}