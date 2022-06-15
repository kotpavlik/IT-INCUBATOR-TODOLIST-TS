import React from 'react';
import {action} from '@storybook/addon-actions'
import {ReduxStoreProviderDecorator} from './components/stories/ReduxStoreProviderDecorator';
import App from './App';




export default {
    title: 'App Component',
    component: App,
    decorators:[ReduxStoreProviderDecorator]
}

const EditableSpanCallBack = action('')

export const AddItemFormBaseExample = () => {
    return <App/>



}