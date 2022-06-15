import React from "react";
import { AddItemForm } from "./AddItemForm";
import {action} from "@storybook/addon-actions"


export default {
    title: 'AddItemFormComponent',
    component: AddItemForm
}

const AddItemCallBack = action('Button "add" was pressed')

export const AddItemFormBaseExample = () => {
return <AddItemForm addItem={AddItemCallBack} buttonName={'send'}/>
}