import s from './RegistrationPage.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useInput from '../../validations/Validations';


const RegistrationPage = () => {

    const dataValidations = { //передаем в объект валидацию и ее параметры
        name: useInput('', { isEmpty: true }),
        username: useInput('', { isEmpty: true }),
        email: useInput('', { isEmpty: true, isEmail: true }),
        password: useInput('', { isEmpty: true, isPassword: true }),
        isMan: true,
        age: useInput('', { isEmpty: true, minAge: 10, maxAge: 100})
    };

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
        setData(data)
        // console.log(data);
        heandlePost();


        setData({//для того чтоб импут очищался 
            name: "",
            username: "",
            email: "",
            password: "",
            isMan: "true",
            age: 0
        });
    };

    const heandlePost = async () => {
        console.log("-----heandlePost-------");
        console.log(data);
        try {
            const res = await axios.post("https://first-node-js-app-r.herokuapp.com/api/users/register", data);
            console.log(res);

            navigate('/loginPage'); //вызываем navigate и передаем url, куда хотим чтоб нас перекинуло

        } catch (error) {
            console.log(error);
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
                            {(dataValidations.name.isDirty && dataValidations.name.isEmpty) && <span className={s.error}>{dataValidations.name.isEmpty}</span>}
                        </label>

                        <input
                            onChange={(e) => { setData({ ...data, name: e.target.value }); dataValidations.name.onChange(e) }}
                            onBlur={(e) => dataValidations.name.onBlur(e)}
                            value={data.name}
                            type='text'
                            className={s.input} />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="username">Username
                            <span>*</span>
                            {(dataValidations.username.isDirty && dataValidations.username.isEmpty) && <span className={s.error}>{dataValidations.username.isEmpty}</span>}
                        </label>
                        <input
                            onChange={(e) => { setData({ ...data, username: e.target.value }); dataValidations.username.onChange(e) }}
                            onBlur={(e) => dataValidations.username.onBlur(e)}
                            value={data.username}
                            type='text'
                            className={s.input} />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="email">Email
                            <span>*</span>
                            {
                                ((dataValidations.email.isDirty && dataValidations.email.isEmpty) && <span className={s.error}>{dataValidations.email.isEmpty}</span>) ||
                                ((dataValidations.email.isDirty && dataValidations.email.emailError) && <span className={s.error}>{dataValidations.email.emailError}</span>)
                            }
                        </label>
                        <input
                            onChange={(e) => { setData({ ...data, email: e.target.value }); dataValidations.email.onChange(e) }}
                            onBlur={(e) => dataValidations.email.onBlur(e)}
                            value={data.email}
                            type='email'
                            className={s.input} />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="password">Password
                            <span>*</span>
                            {
                                ((dataValidations.password.isDirty && dataValidations.password.isEmpty) && <span className={s.error}>{dataValidations.password.isEmpty}</span>) ||
                                ((dataValidations.password.isDirty && dataValidations.password.passwordError) && <span className={s.error}>{dataValidations.password.passwordError}</span>)
                            }
                        </label>
                        <input
                            onChange={(e) => {setData({ ...data, password: e.target.value }); dataValidations.password.onChange(e)}}
                            onBlur={(e) => dataValidations.password.onBlur(e)}
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
                            {
                                ((dataValidations.age.isDirty && dataValidations.age.isEmpty) && <span className={s.error}>{dataValidations.age.isEmpty}</span>) ||
                                ((dataValidations.age.isDirty && dataValidations.age.minAgeError) && <span className={s.error}>{dataValidations.age.minAgeError}</span>) ||
                                ((dataValidations.age.isDirty && dataValidations.age.maxAgeError) && <span className={s.error}>{dataValidations.age.maxAgeError}</span>)
                            }
                        </label>
                        <input
                            onChange={(e) => {setData({ ...data, age: Number(e.target.value) }); dataValidations.age.onChange(e)}}
                            onBlur={(e) => dataValidations.age.onBlur(e)}
                            value={data.age}
                            type='number'
                            className={s.input} />
                    </div>

                    <div className={s.wrapBtn}>
                        <button disabled={!dataValidations.name.inputValid || 
                                        !dataValidations.username.inputValid || 
                                        !dataValidations.email.inputValid || 
                                        !dataValidations.password.inputValid || 
                                        !dataValidations.age.inputValid } 
                                        className={s.btn} 
                                        type="submit">
                            Registration
                        </button>
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