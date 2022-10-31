import s from './ToDo.module.css';
import { useState,useEffect } from "react";
import axios from 'axios';

import Edit from "./../../assets/edit.png";
import Delete from "./../../assets/delete.png";
import Save from "./../../assets/save.png";
import InputEdit from '../inputEdit/InputEdit';


const ToDo = ({ index, task, handleDelete, handleEdit, handleComplete}) => {

    const [isEdit, setIsEdit] = useState(false);
    const [text, setText] = useState(task.title);

    const toggle = () => {  //вызвать изменения
        if (isEdit) {
            handleEdit(task.ID, text);
        }
        setIsEdit(!isEdit);
    };


    const onKeyDown = e =>{ // сохранение по нажатию Enter
        if (e.key === 'Enter') { //e.keyCode == 13 -номер Enter
            toggle()}
            
        }

        
    return (
        <>
            <div className={index % 2 === 0 ? s.innerItem : s.innerItemBg}>
                <div onClick={() => toggle()} className={s.wrapLeft}>

                    <div className={s.checkbox}>
                        <input className={s.checkboxInput} 
                        type='checkbox' id={task.ID} 
                        onChange={() => handleComplete(task.ID)} />
                        <label className={s.checkboxLabel} htmlFor={task.ID}></label>
                    </div>

                    {isEdit
                        ? <InputEdit 
                            setText={setText}
                            text={text}
                            onKeyDown={onKeyDown}

                        />
                        : <div  className={task.isCompleted ? s.completed : ""}>{task.title}</div>}
                </div>
                <div className={s.wrapRight}>
                    <button className={s.btnDelete} onClick={() => handleDelete(task.ID)}> 
                        <img src={Delete} alt="delete" />
                    </button>
                    <button className={s.btnEdit} onClick={() => toggle()}>
                        {isEdit ? <img src={Save} alt="save" /> : <img src={Edit} alt="edit" />}
                    </button>
                </div>
            </div>

        </>
    );
}

export default ToDo;