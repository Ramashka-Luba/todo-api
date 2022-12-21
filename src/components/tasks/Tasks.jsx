import s from './Tasks.module.css';
import { useEffect } from "react";
import axios from 'axios';
import ToDo from '../toDo/ToDo';
import {localStorageGetItem} from "./../../helpers/IsHelpers"



const Tasks = ({ tasks, setTasks }) => {

    ////////////// Запрос с сервера всех задач //////////////
    useEffect(() => {
        async function fetchData() {
            const token = localStorageGetItem("token");  //получаем токеи для работы с сервером
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

 
    ////////////// Редактирование //////////////    
    const handleEdit = (id, text) => {
        const arr = tasks.map(item => item.id === id ? { ...item, title: text } : item);
        // setTasks([...arr]);

        try {
            const requestEdit = async () => {
                const token = localStorageGetItem("token");
                const result = await axios.patch(`https://first-node-js-app-r.herokuapp.com/api/todos/${id}`,
                    { title: text },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    },
                );
                console.log("-------Edit-------");
                console.log(result);

                if (result.status === 200) {
                    setTasks([...arr]);
                } else {
                    alert ("Данные не обновились")
                }
            }
            requestEdit()

        } catch (error) {
            console.log(error);
        }
    };


       ////////////// Удаление //////////////
       const handleDelete = (id) => {
        try {
            const requestDelete = async () => {
                const token = localStorageGetItem("token");
                // console.log(id);
                const resultDelete = await axios.delete(`https://first-node-js-app-r.herokuapp.com/api/todos/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    },
                );
                console.log("-------Delete-------");
                console.log(resultDelete);
                
                const filtredArr = tasks.filter((item) => item.ID !== id);
                if (resultDelete.status === 200) {
                    setTasks([...filtredArr]);
                } else {
                    alert ("Данные не обновились")
                }
            }
            requestDelete()
            // const filtredArr = tasks.filter((item) => item.ID !== id);
            // setTasks([...filtredArr]);         
        } catch (error) {
            console.log(error);
        }
    };


    ////////////// Заваршина таска или нет  //////////////    
    const handleComplete = (id) => {
        // setTasks(tasks.map(item => {
        //     if (item.ID === id) {
        //         return {
        //             ...item, isCompleted: !item.isCompleted
        //         };
        //     }
        //     return item;
        // }))

        try {
            const requestComplete = async () => {
                const token = localStorageGetItem("token");
                // console.log(token);
                const resultEnd = await axios.patch(`https://first-node-js-app-r.herokuapp.com/api/todos/${id}/isCompleted`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                console.log("-------End-------");
                console.log(resultEnd);

                if (resultEnd.status === 200) {
                    setTasks(tasks.map(item => {
                        if (item.ID === id) {
                            return {
                                ...item, isCompleted: !item.isCompleted
                            };
                        }
                        return item;
                    }))
                } else {
                    alert("Данные не обновились")
                }
            }
            requestComplete()

        } catch (error) {
            console.log(error);
        }
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