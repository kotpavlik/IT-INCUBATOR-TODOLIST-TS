import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    editTitle: (newTitle: string) => void
}
const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);


    const activeEditMode = () => {
        setEditMode(true)
    }
    const activeVueMode = () => {
        setEditMode(false)
        props.editTitle(title)
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
         setTitle(e.currentTarget.value)
    }

    return (

        editMode
            ? <input autoFocus onChange={onChangeTitleHandler} onBlur={activeVueMode} value={title}/>
            : <span onDoubleClick={activeEditMode}>{props.title}</span>

    );
};

export default EditableSpan;