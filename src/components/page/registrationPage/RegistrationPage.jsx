import s from './RegistrationPage.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Arrow from "./../../../assets/arrow-right.png"

const RegistrationPage = () => {

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


    // ----------------Validations-----------------

// const useInput = (initialValue, validations) => {
//     const [value, setValue] = useState (initialValue); // значение внутри Inputa
//     const [isDirty, setDirty] = useState (false);

//     const onChange = (e) => {
//         setValue(e.target.value)
//     }

//     const onBlur = (e) => {
//         setDirty(true)
//     }
//     return {
//         value,
//         onChange,
//         onBlur
//     }
// }




    // ----------------Validations-----------------



    return (
        <div className={s.RegistrationPage}>
            <div className={s.inner}>
                <h2 className={s.title}>Registration</h2>

                <form onSubmit={(e) => handleSubmit(e)}
                    className={s.wrapForm}>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="name">Name
                            <span>*</span>
                            <span className={s.error}>Name is required</span>
                        </label>

                        <input
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            value={data.name}
                            type='text'
                            className={s.input} />

                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="username">Username<span>*</span></label>
                        <input
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                            value={data.username}
                            type='text'
                            className={s.input} />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="email">Email<span>*</span></label>
                        <input
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            value={data.email}
                            type='email'
                            className={s.input} />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="password">Password<span>*</span></label>
                        <input
                            onChange={(e) => setData({ ...data, password: e.target.value })}
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
                        <label className={s.label} htmlFor="age">Age<span>*</span></label>
                        <input
                            onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
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