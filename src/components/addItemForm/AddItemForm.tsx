import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import style from './AddItemForm.module.css';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    buttonName: string
}

export const  AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [taskName, setTaskName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        let trimTaskName = taskName.trim();
        if (trimTaskName) {
            props.addItem(trimTaskName);
            setTaskName('');
        } else {
            setError('Title is required');
        }

    }
    const onChangeHandlerTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.currentTarget.value);
        if(error !== null) {
            setError(null);
        }
    }
    const onKeyPressHandlerTaskName =(e: KeyboardEvent<HTMLInputElement>) => {
        let trimTaskName = taskName.trim();
        if (trimTaskName === 'wtf' || trimTaskName === 'fuck') {
            setTaskName('');
            alert('не ругайся')
            return;
        }
        if (e.ctrlKey && e.charCode === 13) {
            addTask();
        }
    }
    const styleInputError = error ? style.error_input : style.input_style;


    return (
        <div className={style.add_input_wrapper}>
            {error && <span className={style.error_message}>{error}</span>}
            <input
                value={taskName}
                onChange={onChangeHandlerTaskName}
                onKeyPress={onKeyPressHandlerTaskName}
                className={styleInputError}/>
            <button onClick={addTask} className={style.no_active_button}>{props.buttonName}</button>
        </div>
    )
})