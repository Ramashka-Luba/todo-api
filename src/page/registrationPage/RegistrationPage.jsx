import s from './RegistrationPage.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useInput from '../../validations/Validations';


const RegistrationPage = () => {

    const [errorMessages, setErrorMessages] = useState( { //ошибки 
        name: "",
        username: "",
        email: '',
        password: '',
        age: ''
    });


    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        isMan: true,
        age: 0
    });

    const navigate = useNavigate(); //сосдаем экземпляр хука


    const handleSubmit = (e) => {
        e.preventDefault();
        setData(data);
        // console.log(data);
        heandlePost();
}

    const heandlePost = async () => {
        console.log("-----heandlePost-------");
        console.log(data);
        try {
            const res = await axios.post("https://first-node-js-app-r.herokuapp.com/api/users/register", data);
            console.log(res);
            setData({//для того чтоб импут очищался 
                name: "",
                username: "",
                email: "",
                password: "",
                isMan: "true",
                age: 0
            });
            navigate('/loginPage'); //вызываем navigate и передаем url, куда хотим чтоб нас перекинуло

        } catch (error) {
            console.log(error);
            const errors = error.response.data.errors;
            const obj = {name: '', username: '', email:'', password: '',age: ''};
            for (let index in errors) {
                console.log(errors[index].msg);
                switch (errors[index].param) {
                    case 'name':
                        obj.name = errors[index].msg;
                        break;
                    case 'username':
                        obj.username = errors[index].msg;
                        break;
                    case 'email':
                        // console.log(errors[index].msg);
                        obj.email = errors[index].msg;
                        break;
                    case 'password':
                        obj.password = errors[index].msg;
                        break;
                    case 'age':
                        obj.age = errors[index].msg;
                        break;
                }
                setErrorMessages(obj);
            }
        }
    };

    return (
        <div className={s.RegistrationPage}>
            <div className={s.inner}>
                <h2 className={s.title}>Registration</h2>

                <form onSubmit={(e) => handleSubmit(e)}
                    className={s.wrapForm}>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="name">Name
                            <span>*</span>
                            <span className={s.error}>{errorMessages.name}</span>
                            
                        </label>

                        <input
                            onChange={(e) => { setData({ ...data, name: e.target.value })}}
                            value={data.name}
                            type='text'
                            className={s.input} />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="username">Username
                            <span>*</span>
                            <span className={s.error}>{errorMessages.username}</span>
                        </label>
                        <input
                            onChange={(e) => { setData({ ...data, username: e.target.value })}}
                            value={data.username}
                            type='text'
                            className={s.input} />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="email">Email
                            <span>*</span>
                            <span className={s.error}>{errorMessages.email}</span>
                        </label>

                        <input
                            onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                            value={data.email}
                            type='email'
                            className={s.input} />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="password">Password
                            <span>*</span>
                            <span className={s.error}>{errorMessages.password}</span>
                        </label>
                        <input
                            onChange={(e) => {setData({ ...data, password: e.target.value })}}
                            value={data.password}
                            type='password'
                            className={s.input} />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="gender">Gender<span>*</span></label>
                        <div className={s.select}>
                            <select
                                onChange={(e) => setData({ ...data, isMan: !data.isMan })}
                                value={data.isMan}
                                name="gender">
                                <option value="true">Male</option>
                                <option value="false">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="age">Age
                            <span>*</span>
                            <span className={s.error}>{errorMessages.age}</span>
                        </label>
                        <input
                            onChange={(e) => {setData({ ...data, age: Number(e.target.value) });}}
                            value={data.age}
                            type='number'
                            className={s.input} />
                    </div>

                    <div className={s.wrapBtn}>
                        <button className={s.btn} type="submit">Registration</button>
                    </div>

                    <div className={s.linkWrap}>
                        <a href="/loginPage" className={s.link}>Sign In &#8594;</a>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default RegistrationPage;