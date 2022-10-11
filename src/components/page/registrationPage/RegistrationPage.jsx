import s from './RegistrationPage.module.css';
import { useState } from 'react';
import axios from 'axios';

const RegistrationPage = () => {

    const [data,setData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        isMan: true,
        age: 0
    });


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

    const heandlePost = async() => {
        // console.log("-----heandlePost-------");
        console.log(data);
        try {
            const res = await axios.post ("https://first-node-js-app-r.herokuapp.com/api/users/register", data );
            console.log(res);
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
                        <label className={s.label} htmlFor="name">Name<span>*</span></label>
                        <input 
                            onChange={(e) => setData({...data, name : e.target.value})}
                            value={data.name} 
                            type='text'
                            className={s.input}/>
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="username">Username<span>*</span></label>
                        <input 
                            onChange={(e) => setData({...data, username : e.target.value})}
                            value={data.username} 
                            type='text'
                            className={s.input}  />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="email">Email<span>*</span></label>
                        <input
                            onChange={(e) => setData({...data, email : e.target.value})}
                            value={data.email} 
                            type='email'
                            className={s.input}  />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="password">Password<span>*</span></label>
                        <input 
                            onChange={(e) => setData({...data, password : e.target.value})}
                            value={data.password} 
                            type='password'
                        className={s.input}  />
                    </div>

                    <div className={s.wrapInput}>
                        <label className={s.label} htmlFor="gender">Gender<span>*</span></label>
                        <div className={s.select}>
                            <select 
                                onChange={(e) => setData({...data, isMan : !data.isMan})}
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
                            onChange={(e) => setData({...data, age : Number(e.target.value)})}
                            value={data.age} 
                            type='number'
                            className={s.input}  />
                    </div>

                    <div className={s.wrapBtn}>
                        <button className={s.btn} type="submit">Registration</button>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default RegistrationPage;