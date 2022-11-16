import s from './LoginPage.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// ----------------Validations-----------------

const useValidation = (value, validations) => { //хук валидирования; //2парам-текущ. знач. и набор валидаторов по которым мы будем проверять импут
    const [isEmpty, setEmpty] = useState('') // состояние для валидации //пустая строка или нет
    const [minLengthError, setMinLengthError] = useState('') 
    const [maxLengthError, setMaxLengthError] = useState('')
    const [emailError, setEmailError] = useState('') 
    const [passwordError, setPasswordError] = useState('') 
    const [minAgeError, setMinAgeError] = useState('')
    const [maxAgeError, setMaxAgeError] = useState('')
    const [inputValid, setInputValid] = useState(false) //дизэблим кнопку // состояние для всех валидностей


    useEffect(() => { 
        for (const validation in validations) { // пробигаемся по полям обьекта validations //- это обьект хран. в себе инфо о видах валидации;
            switch (validation) { 
                case "minLength": //длина для ввода пароля;
                    value.length < validations[validation] ? setMinLengthError(`Длина не может быть меньше ${validations[validation]} `) : setMinLengthError('') 
                    break;
                case "isEmpty": //на пустоту поля;
                    value ? setEmpty('') : setEmpty('Поле не может быть пустым')
                    break;
                case "maxLength":
                    value.length > validations[validation] ? setMaxLengthError(`Длина не может быть больше ${validations[validation]} `) : setMaxLengthError('')
                    break;
                case "isEmail":
                    const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    reEmail.test(String(value).toLowerCase()) ? setEmailError('') : setEmailError('Некорректный email')
                    break;
                case "isPassword":
                    const rePassword = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
                    rePassword.test(String(value)) ? setPasswordError('') : setPasswordError('min из 8 символов, 1 заглавная буква, 1 строчная буква, 1 цифра и 1 символ')
                    break;
                case "minAge":
                    value < validations[validation] ? setMinAgeError('Не менее 10 лет') : setMinAgeError ('')
                    break;
                case "maxAge":
                    value > validations[validation] ? setMaxAgeError('Не более 100 лет') : setMaxAgeError ('')
                    break;
            }
        }
    }, [value]) 

    useEffect(() => { //дизэблим кнопку
        if (isEmpty || maxLengthError || minLengthError || emailError || passwordError || minAgeError || maxAgeError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, maxLengthError, minLengthError, emailError, passwordError, minAgeError, maxAgeError])
    return {
        isEmpty,
        minLengthError,
        emailError,
        maxLengthError,
        passwordError,
        minAgeError,
        maxAgeError,
        inputValid
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue); // значение внутри Inputa
    const [isDirty, setDirty] = useState(false); // вышли мы из Inputa или нет
    const valid = useValidation(value, validations) 
    const onChange = (e) => {  // обрабатывает изменения внутри Inputa
        setValue(e.target.value)
    }
    const onBlur = (e) => { //отрабатывает в тот момент когда пользователь покинул Input
        setDirty(true)
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}
// ----------------Validations-----------------

const LoginPage = () => {

    const [dataLog, setDataLog] = useState ({
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

    const heandlePostLog = async() => {
        // console.log("-----heandlePostLog-------");
        // console.log(dataLog);
        try {
            const res = await axios.post ("https://first-node-js-app-r.herokuapp.com/api/auth/login", dataLog );
            // console.log(res.data.token);


            if (!res.data.token) { //несли нет token, то сгинерируй ошибку
                throw new Error (res.data.message) // и опракинь сюда res.data.message
            }  else { // иначе запиши token и перекинь на todo
                localStorage.setItem ("token", res.data.token)
                navigate('/mainPage'); //вызываем navigate и передаем url, куда хотим чтоб нас перекинуло
            }

            localStorage.setItem ("token", res.data.token)
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
                <button className={s.btn} type="submit">Sign In</button>
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

// pena-1@yandex.ru
// Asdfghjk123+

// asd@gmail.com
// Asdfg123+