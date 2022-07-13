import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    editTitle: (newTitle: string) => void
}
const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false);
    let [newTitle, setNewTitle] = useState(props.title);


    const activeEditMode = () => {
        setEditMode(!editMode)
    }
    const sendNewTitle = () => {
        setEditMode(!editMode)
        props.editTitle(newTitle)
    }

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (

        editMode
            ? <input autoFocus onChange={onChangeTitleHandler} onBlur={sendNewTitle} value={newTitle}/>
            : <span onDoubleClick={activeEditMode}>{props.title}</span>

    );
})

export default EditableSpan;