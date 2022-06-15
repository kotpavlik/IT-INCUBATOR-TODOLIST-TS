import React from 'react';
import {Provider} from 'react-redux';
import {AppStateType, store} from '../../reducers/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../reducers/Tasks-reducer';
import {todoListsReducer} from '../../reducers/TodoLists-reducer';
import { v1 } from 'uuid';

const rootReducer = combineReducers({
    tasks:tasksReducer,
    todoLists:todoListsReducer
})

const initialGlobalState = {
    todoLists:[
        {id:'todolistId1', title:'first todolist', filter:'all' },
        {id:'todolistId2', title:'second todolist', filter:'all' }
    ],
    tasks:{
        ['todolistId1']:[
            {id:'1',title:'HTML',isDone:true},
            {id:'2',title:'CSS',isDone:false}
        ],
        ['todolistId2']:[
            {id:'3',title:'Milk',isDone:true},
            {id:'4',title:'Bread',isDone:false}
        ]
    }
}

export const storyBookStore = createStore(rootReducer,initialGlobalState as AppStateType)

export const ReduxStoreProviderDecorator = (story:any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}