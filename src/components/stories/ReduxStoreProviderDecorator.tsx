import React from 'react';
import {Provider} from 'react-redux';
import {AppStateType} from '../../reducers/store';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../../reducers/Tasks-reducer';
import {todoListsReducer} from '../../reducers/TodoLists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/API';

const rootReducer = combineReducers({
    tasks:tasksReducer,
    todoLists:todoListsReducer
})

const initialGlobalState:AppStateType = {
    todoLists:[
        {id:'todolistId1', title:'first todolist', filter:'all', order:0, addedDate: '', },
        {id:'todolistId2', title:'second todolist', filter:'all', order:0, addedDate: '', }
    ],
    tasks:{
        ['todolistId1']:[
            {id:'1',title:'HTML',status:TaskStatuses.Completed,description:'',priority:TaskPriorities.Low , startDate: '',deadline:'',todoListId:'todolistId1',order:0,addedDate:''},
            {id:'2',title:'CSS',status:TaskStatuses.New,description:'',priority:TaskPriorities.Low , startDate: '',deadline:'',todoListId:'todolistId1',order:0,addedDate:''}
        ],
        ['todolistId2']:[
            {id:'3',title:'Milk',status:TaskStatuses.Completed,description:'',priority:TaskPriorities.Low , startDate: '',deadline:'',todoListId:'todolistId2',order:0,addedDate:''},
            {id:'4',title:'Bread',status:TaskStatuses.New,description:'',priority:TaskPriorities.Low , startDate: '',deadline:'',todoListId:'todolistId2',order:0,addedDate:''}
        ]
    }
}

export const storyBookStore = createStore(rootReducer,initialGlobalState as AppStateType)

export const ReduxStoreProviderDecorator = (story:any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}