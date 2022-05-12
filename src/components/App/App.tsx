import {useEffect} from "react";
import {connect} from "react-redux";
import {Navigate, Route, Routes} from 'react-router';
import axios from "axios";
import Header from '../Header'
import Footer from "../Footer";
import MainPage from "../../pages/MainPage";
import AuthPage from "../../pages/AuthPage";
import {
  filteredAllCountriesSelector,
  filteredLearnedCountriesSelector, filteredNotLearnedCountriesSelector,
  userIdSelector,
  userLoadedSelector,
  userLoadingSelector
} from "../../redux/selectors";
import {loadUserInfo} from "../../redux/actions";
import CountriesPage from "../../pages/CountriesPage";

import styles from './App.module.scss'


interface Props {
  userId: string
  loadUserInfo: any
  loading: boolean
  loaded: boolean
  onlyLearnedCountries: any
  onlyNotLearnedCountries: any
  allCountries: any
}

const App = ({
               userId,
               loadUserInfo,
               loaded,
               loading,
               onlyLearnedCountries,
               onlyNotLearnedCountries,
               allCountries
             }: Props) => {
  const registrationFunc = (username: string, password: string) =>
    axios.post('/user/registration', {username, password})
  const loginFunc = (username: string, password: string) =>
    axios.post('/user/login', {username, password})

  useEffect(() => {
    if (userId) loadUserInfo(userId)
  }, [userId, loadUserInfo])
  if (!loaded && loading) return <p>Loading...</p>


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


        <Route path='/known_countries'
               element={userId ? <CountriesPage filteredArray={onlyLearnedCountries}/> : <Navigate replace to="/"/>}/>
        <Route path='/unknown_countries'
               element={userId ? <CountriesPage filteredArray={onlyNotLearnedCountries}/> :
                 <Navigate replace to="/"/>}/>
        <Route path='/all_countries'
               element={userId ? <CountriesPage filteredArray={allCountries}/> : <Navigate replace to="/"/>}/>


        <Route path='/' element={<MainPage/>}/>
      </Routes>
      <Footer title="Created by " link="https://github.com/Donnle" linkText="@Donnle"/>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  userId: userIdSelector(state),
  loading: userLoadingSelector(state),
  loaded: userLoadedSelector(state),
  onlyLearnedCountries: filteredLearnedCountriesSelector(state),
  onlyNotLearnedCountries: filteredNotLearnedCountriesSelector(state),
  allCountries: filteredAllCountriesSelector(state),
})

const mapDispatchToProps = (dispatch: any) => ({
  loadUserInfo: (userId: string) => dispatch(loadUserInfo(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
