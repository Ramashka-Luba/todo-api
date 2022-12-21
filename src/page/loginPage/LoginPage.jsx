import s from './LoginPage.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useInput from '../../helpers/Validations';
import {localStorageSetItem} from "./../../helpers/IsHelpers"

// asd@asd.com
// Asdfghjk123@

const LoginPage = () => {

    const dataLogValidations = {
        email: useInput('', { isEmpty: true, isEmail: true }),
        password: useInput('', { isEmpty: true, isPassword: true })
    };

    const [dataLog, setDataLog] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate(); //сосдаем экземпляр хука

    const handleSubmitLog = (e) => {
        e.preventDefault();
        setDataLog(dataLog)
        // console.log(data);
        heandlePostLog();


        setDataLog({//для того чтоб импут очищался 
            email: "",
            password: ""
        });
    };

    const heandlePostLog = async () => {
        // console.log("-----heandlePostLog-------");
        // console.log(dataLog);
        try {
            const res = await axios.post(process.env.REACT_APP_LOGIN, dataLog);
            // console.log(res.data.token);
            // console.log(process.env.REACT_APP_LOGIN);

            if (!res.data.token) { //несли нет token, то сгинерируй ошибку
                throw new Error(res.data.message) // и опракинь сюда res.data.message
            } else { // иначе запиши token и перекинь на todo
                localStorageSetItem("token", res.data.token)
                navigate('/mainPage'); //вызываем navigate и передаем url, куда хотим чтоб нас перекинуло
            }

            localStorageSetItem("token", res.data.token)
            navigate('/mainPage'); //вызываем navigate и передаем url, куда хотим чтоб нас перекинуло

        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    };

    return (
        <div className={s.LoginPage}>
            <div className={s.inner}>
                <h2 className={s.title}>Sign In</h2>

                <form onSubmit={(e) => handleSubmitLog(e)}
                    className={s.wrapForm}>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="email">Email
                            <span>*</span>
                            {
                                ((dataLogValidations.email.isDirty && dataLogValidations.email.isEmpty) && <span className={s.error}>{dataLogValidations.email.isEmpty}</span>) ||
                                ((dataLogValidations.email.isDirty && dataLogValidations.email.emailError) && <span className={s.error}>{dataLogValidations.email.emailError}</span>)
                            }
                        </label>
                        <input
                            onChange={(e) => {setDataLog({ ...dataLog, email: e.target.value }); dataLogValidations.email.onChange(e)}}
                            onBlur={(e) => dataLogValidations.email.onBlur(e)}
                            value={dataLog.email}
                            type='email'
                            className={s.input} />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="password">Password
                            <span>*</span>
                            {
                                ((dataLogValidations.password.isDirty && dataLogValidations.password.isEmpty) && <span className={s.error}>{dataLogValidations.password.isEmpty}</span>) ||
                                ((dataLogValidations.password.isDirty && dataLogValidations.password.passwordError) && <span className={s.error}>{dataLogValidations.password.passwordError}</span>)
                            }

                        </label>
                        <input
                            onChange={(e) => {setDataLog({ ...dataLog, password: e.target.value }); dataLogValidations.password.onChange(e)}}
                            onBlur={(e) => dataLogValidations.password.onBlur(e)}
                            value={dataLog.password}
                            type='password'
                            className={s.input} />
                    </div>

                    <div className={s.wrapBtn}>
                        <button disabled={!dataLogValidations.email.inputValid || 
                                        !dataLogValidations.password.inputValid} 
                                        className={s.btn} 
                                        type="submit">
                            Sign In
                        </button>
                    </div>

                    <div className={s.linkWrap}>
                        <a href="/" className={s.link}>Registration &#8594;</a>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default LoginPage;



