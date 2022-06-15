import React from "react";
import {action} from "@storybook/addon-actions"
import EditableSpan from "./EditableSpan";



export default {
    title: 'EditableSpanComponent',
    component: EditableSpan
}

const EditableSpanCallBack = action('DoubleClick was pressed on the title')

export const AddItemFormBaseExample = () => {
    return <EditableSpan editTitle={EditableSpanCallBack} title={"doubleClick me please "}/>
}