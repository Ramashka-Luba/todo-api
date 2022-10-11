import { useState } from 'react';

import s from './MainPage.module.css';
import Form from '../../form/Form.jsx'
import ToDo from '../../toDo/ToDo.jsx'


const MainPage = () => {

const [tasks, setTasks] = useState([
    { id: 1, title: "Buy Orange", isCompleted: false },
]);


const handleDelete = (id) => {
    const filtredArr = tasks.filter((item) => item.id !== id);
    setTasks([...filtredArr]);
};

const handleEdit = (id, text ) => {
    const arr = tasks.map(item => item.id === id ? { ...item, title: text } : item);

    setTasks([...arr]);
};

const handleComplete = (id) => {    // заваршина таска или нет 
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
    <div className={s.MainPage}>
        <div className={s.inner}>
            <h2 className={s.title}>What's the Plan for Today?</h2>
            <Form
                setTasks={setTasks}
                tasks={tasks} />

            <ul className={s.list}>
                {tasks.map((task) => (
                    <ToDo key={task.id}  //чтобы пофиксить ошибку с "key" - корневому элементу добавляем key и присваиваем наш id
                        task={task}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleComplete={handleComplete}
                    />
                ))}
            </ul>
        </div>
    </div>
);
}

export default MainPage;