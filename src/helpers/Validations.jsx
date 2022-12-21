import { useState, useEffect } from 'react';


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

export default useInput;