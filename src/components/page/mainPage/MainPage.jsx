import { useState } from 'react';

import s from './MainPage.module.css';
import Form from '../../form/Form.jsx'
import ToDo from '../../toDo/ToDo.jsx'
import Tasks from '../../tasks/Tasks';


const MainPage = () => {

const [tasks, setTasks] = useState([
    // { id: 1, title: "Buy Orange", isCompleted: false },
]);

return (
    <div className={s.MainPage}>
        <div className={s.inner}>
            <h2 className={s.title}>What's the Plan for Today?</h2>
            <Form
                tasks ={tasks}
                setTasks={setTasks}
            />

            <Tasks
                tasks ={tasks}
                setTasks={setTasks}
            />    

        </div>
    </div>
);
}

export default MainPage;