import s from './Tasks.module.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import ToDo from '../toDo/ToDo';


const Tasks = ({ tasks, setTasks }) => {

    ////////////// Запрос с сервера всех задач //////////////
    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem("token");  //получаем токеи для работы с сервером

            const result = await axios.get("https://first-node-js-app-r.herokuapp.com/api/todos",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                },
            );
            console.log("-----result-------");
            console.log(result.data);

            setTasks(result.data);
        }
        fetchData();
    }, []);

    ////////////// Удаление //////////////
    const handleDelete = (id) => {

        const requestDelete = async () => {
            const token = localStorage.getItem("token");  
            // console.log(id);
            const result = await axios.delete(`https://first-node-js-app-r.herokuapp.com/api/todos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                },
            );
        }
        requestDelete()

        const filtredArr = tasks.filter((item) => item.ID !== id);
        setTasks([...filtredArr]);
    };


    ////////////// Редактирование //////////////    
    const handleEdit = (id, text) => {
        const arr = tasks.map(item => item.id === id ? { ...item, title: text } : item);

        setTasks([...arr]);

        const requestEdit = async () => {
            const token = localStorage.getItem("token");  
            const result = await axios.patch(`https://first-node-js-app-r.herokuapp.com/api/todos/${id}`,
                { title: text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                },
            );
            console.log(result);
        }
        requestEdit()
    };


    ////////////// Заваршина таска или нет  //////////////    
    const handleComplete = (id) => {
        setTasks(tasks.map(item => {
            if (item.ID === id) {
                return {
                    ...item, isCompleted: !item.isCompleted
                };
            }
            return item;
        }))

        const requestComplete = async () => {
            const token = localStorage.getItem("token");  
            // console.log(token);
            const result = await axios.patch(`https://first-node-js-app-r.herokuapp.com/api/todos/${id}/isCompleted`,
                { },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        }
        requestComplete()
    };


    return (
        <>
            <ul className={s.list}>
                {tasks ? tasks.map((task, index) => (
                    <ToDo key={task.ID}  //чтобы пофиксить ошибку с "key" - корневому элементу добавляем key и присваиваем наш id
                        task={task}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleComplete={handleComplete}
                        index={index}
                    />
                )) : <p>...in prpgress</p>
                }
            </ul>
        </>
    );
}

export default Tasks;