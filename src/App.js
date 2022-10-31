import s from './App.module.css';
import {Route, Navigate, Routes}  from "react-router-dom"
import LoginPage from './components/page/loginPage/LoginPage';
import MainPage from './components/page/mainPage/MainPage.jsx';
import RegistrationPage from './components/page/registrationPage/RegistrationPage';




const isAut = () => {
    const ls = localStorage.getItem("token");
    if (ls) {
        return true;
    }else {
        return false;
    }
};


const RequireAuth = ({ children, redirectTo }) => {
    let isAuthenticated = isAut();
    console.log(isAuthenticated);
    return isAuthenticated ? children : <Navigate to={redirectTo}/>;
}

const App = () => {

return (
    <>

        {/* <Routes>
            <Route path="/" element={
                <RequireAuth redirectTo="/login"> {/*redirectTo="/login" - если ты не зологинин перекигь на стр. логинизации */}
                    {/* <MainPage /> {/*children - если ты зологинин перекигь на нужную страницу */}
                {/* </RequireAuth>
            }/>
            <Route path="/login" element={<LoginPage />}/> 
        </Routes> */} 

        {/* <MainPage/> */}
        {/* <Registration/>
        {/* <LoginPage/> */}


        <Routes>
            <Route path="/" element={<RegistrationPage/>}/>
            <Route path="/loginPage" element={<LoginPage/>}/>
            <Route path="/mainPage" element={<MainPage/>}/>
        </Routes>





    </>
);
}

export default App;