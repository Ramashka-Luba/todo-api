import s from './LoginPage.module.css';
import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {

    const [dataLog, setDataLog] = useState ({
        email: "",
        password: ""
    });

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

    const heandlePostLog = async() => {
        // console.log("-----heandlePostLog-------");
        // console.log(dataLog);
        try {
            const res = await axios.post ("https://first-node-js-app-r.herokuapp.com/api/auth/login", dataLog );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

return (
    <div className={s.LoginPage}>
    <div className={s.inner}>
        <h2 className={s.title}>Sing In</h2>

        <form  onSubmit={(e) => handleSubmitLog(e)} 
                className={s.wrapForm}>

        <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="email">Email<span>*</span></label>
                        <input
                            onChange={(e) => setDataLog({...dataLog, email : e.target.value})}
                            value={dataLog.email} 
                            type='email'
                            className={s.input}  />
                    </div>

            <div className={s.wrapInput}>
                <label className={s.label} htmlFor="password">Password<span>*</span></label>
                <input 
                    onChange={(e) => setDataLog({...dataLog, password : e.target.value})}
                    value={dataLog.password} 
                    type='password'
                className={s.input}  />
            </div>

            <div className={s.wrapBtn}>
                <button className={s.btn} type="submit">Sing In</button>
            </div>

        </form>
    </div>

</div>
);
}

export default LoginPage;