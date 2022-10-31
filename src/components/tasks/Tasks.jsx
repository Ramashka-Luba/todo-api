import s from './Tasks.module.css';
import { useState,useEffect } from "react";
import axios from 'axios';
import ToDo from '../toDo/ToDo';


const Tasks = ({tasks, setTasks}) => {


    // const [tasks, setTasks] = useState(null);

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
    },[]);


    const handleDelete = (id) => {  //удаляем



        const requestDelete = async() => {
            const token = localStorage.getItem("token");  //получаем токеи для работы с сервером
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
    
    const handleEdit = (id, text ) => { // изменяем
        const arr = tasks.map(item => item.id === id ? { ...item, title: text } : item);
    
        setTasks([...arr]);
    };
    
    const handleComplete = (id) => { // заваршина таска или нет 
        setTasks(tasks.map(item => {
            if (item.id === id) {
                return {
                    ...item, isCompleted: !item.isCompleted
                };
            }
            return item;
        }))
    };
    

    return (
        <>

            <ul className={s.list}>

                {tasks ?  tasks.map((task, index) => (
                    <ToDo key={task.ID}  //чтобы пофиксить ошибку с "key" - корневому элементу добавляем key и присваиваем наш id
                        task={task}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleComplete={handleComplete}
                        index ={index}
                    />
                )) : <p>...in prpgress</p>
                }
            </ul>


        </>
    );
}

export default Tasks;