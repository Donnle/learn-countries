import {Navigate, Route, Routes} from "react-router";
import axios from "axios";
import AuthPage from "../../pages/AuthPage/AuthPage";

const AuthHoc = () => {
  const registrationFunc = (username: string, password: string) =>
    axios.post('/user/registration', {username, password})
  const loginFunc = (username: string, password: string) =>
    axios.post('/user/login', {username, password})

  return (
    <Routes>
      <Route path='login' element={<AuthPage title='Логин' buttonText='Войти' callFunc={loginFunc}/>}/>
      <Route path='registration'
             element={<AuthPage title='Регистрация' buttonText='Зарегистрироваться' callFunc={registrationFunc}/>}/>
      <Route path='*' element={<Navigate replace to='login'/>}/>
      <Route path='' element={<Navigate replace to='/'/>}/>
    </Routes>
  )
}

export default AuthHoc
