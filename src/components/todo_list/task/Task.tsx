import React, {ChangeEvent, useCallback} from 'react';
import style from '../TodoList.module.css';
import EditableSpan from '../../editableSpan/EditableSpan.';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeIsDoneTaskAC, removeTasksAC, renameTasksAC} from '../../../reducers/Tasks-reducer';
import {useDispatch} from 'react-redux';
import Checkbox from '@mui/material/Checkbox';

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

type TaskPropsType = {
    id:string
    todoId:string
    isDone:boolean
    title:string
}

export const Task = React.memo((props:TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickRemoveTask = useCallback(() => {
        dispatch(removeTasksAC(props.id, props.todoId))
    },[props.id,props.todoId])
    const onClickIsDoneTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeIsDoneTaskAC(props.id, e.currentTarget.checked, props.todoId))
    },[props.id,props.todoId])
    const editTitleTasksHandler = useCallback((newTitle: string) => {
        dispatch(renameTasksAC(newTitle, props.id, props.todoId))
    },[props.id,props.todoId])
    return (
        <li  className={style.task}>
            <Checkbox {...label} size="small" checked={props.isDone}
                      onChange={onClickIsDoneTask}/>

            <span
                className={props.isDone ? style.IsDone : style.IsDone_false}>
                                    <EditableSpan title={props.title} editTitle={editTitleTasksHandler}/></span>

            <IconButton aria-label="delete" size="small" onClick={onClickRemoveTask}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </li>
    );
})
