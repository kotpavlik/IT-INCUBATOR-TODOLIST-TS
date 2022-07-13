import React, {ChangeEvent, useCallback} from 'react';
import style from '../TodoList.module.css';
import EditableSpan from '../../editableSpan/EditableSpan';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    changeIsDoneTaskTC,
    deleteTaskTC,
    renameTaskTC,
} from '../../../reducers/Tasks-reducer';
import {useDispatch} from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses} from '../../../api/API';

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

type TaskPropsType = {
    id:string
    todoId:string
    status:TaskStatuses
    title:string
}

export const Task = React.memo((props:TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickRemoveTask = useCallback(() => {
        dispatch(deleteTaskTC( props.todoId,props.id) as any)
    },[props.id,props.todoId])
    const onClickIsDoneTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeIsDoneTaskTC(props.todoId,props.id, e.currentTarget.checked ) as any)
    },[props.id,props.todoId])
    const editTitleTasksHandler = useCallback((newTitle: string) => {
        dispatch(renameTaskTC(props.todoId, props.id, newTitle ) as any)
    },[props.id,props.todoId])
    return (
        <li  className={style.task}>
            <Checkbox {...label} size="small" checked={props.status !== TaskStatuses.New }
                      onChange={onClickIsDoneTask}/>

            <span
                className={props.status !== TaskStatuses.New ? style.IsDone : style.IsDone_false}>
                                    <EditableSpan title={props.title} editTitle={editTitleTasksHandler}/></span>

            <IconButton aria-label="delete" size="small" onClick={onClickRemoveTask}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </li>
    );
})

