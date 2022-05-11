import {useEffect} from "react";
import {connect} from "react-redux";
import {Navigate, Route, Routes} from 'react-router';
import axios from "axios";
import Header from '../Header'
import Footer from "../Footer";
import MainPage from "../../pages/MainPage";
import AuthPage from "../../pages/AuthPage";
import {userIdSelector} from "../../redux/selectors";

import styles from './App.module.scss'
import {loadUserInfo} from "../../redux/actions";

interface Props {
  userId: string
  loadUserInfo: any
}

const App = ({userId, loadUserInfo}: Props) => {
  const registrationFunc = (username: string, password: string) =>
    axios.post('/user/registration', {username, password})
  const loginFunc = (username: string, password: string) =>
    axios.post('/user/login', {username, password})

  useEffect(() => {
    if (userId) loadUserInfo(userId)
  }, [userId, loadUserInfo])

  return (
    <div className={styles.container}>
      <Header/>
      <Routes>
        <Route path='/login'
               element={userId ? <Navigate replace to="/"/> :
                 <AuthPage title='Логин' buttonText='Войти' callFunc={loginFunc}/>}/>

        <Route path='/registration'
               element={userId ? <Navigate replace to="/"/> :
                 <AuthPage title='Регистрация' buttonText='Зарегистрироваться' callFunc={registrationFunc}/>}/>

        <Route path='/' element={<MainPage/>}/>
      </Routes>
      <Footer title="Created by " link="https://github.com/Donnle" linkText="@Donnle"/>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  userId: userIdSelector(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  loadUserInfo: (userId: string) => dispatch(loadUserInfo(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
