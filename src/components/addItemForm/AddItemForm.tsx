import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import style from './AddItemForm.module.css';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    buttonName: string
    disabled?:boolean
}

export const  AddItemForm = React.memo(({addItem,buttonName,disabled = false}: AddItemFormPropsType) => {

    const [taskName, setTaskName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        let trimTaskName = taskName.trim();
        if (trimTaskName) {
            addItem(trimTaskName);
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
                disabled={disabled}
                className={styleInputError}/>
            <button onClick={addTask} className={style.no_active_button} disabled={disabled}>{buttonName} </button>
        </div>
    )
})