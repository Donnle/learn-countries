import axios from "axios";
import {useEffect} from "react";
import {connect} from "react-redux";
import {Navigate, Route, Routes} from 'react-router';
import Header from '../Header'
import Footer from "../Footer";
import MainPage from "../../pages/MainPage";
import AuthPage from "../../pages/AuthPage";
import CountriesPage from "../../pages/CountriesPage";
import {userIdSelector, userLoadedSelector, userLoadingSelector} from "../../redux/selectors";
import {loadUserInfo} from "../../redux/actions";
import {IFilteredCountry} from "../../redux/store";

import styles from './App.module.scss'


interface Props {
  userId: string
  loadUserInfo: (userId: string) => void
  loading: boolean
  loaded: boolean
  notLearnedCountries: IFilteredCountry
  learnedCountries: IFilteredCountry
  allCountries: IFilteredCountry
}

const App = ({userId, loadUserInfo, loaded, loading, notLearnedCountries, learnedCountries, allCountries}: Props) => {
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
               element={userId ? <CountriesPage filteredArray={learnedCountries}/> : <Navigate replace to="/"/>}/>
        <Route path='/unknown_countries'
               element={userId ? <CountriesPage filteredArray={notLearnedCountries}/> : <Navigate replace to="/"/>}/>
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
  notLearnedCountries: state.filteredCountries.onlyNotLearnedCountries,
  learnedCountries: state.filteredCountries.onlyLearnedCountries,
  allCountries: state.filteredCountries.allCountries,
})

const mapDispatchToProps = (dispatch: any) => ({
  loadUserInfo: (userId: string) => dispatch(loadUserInfo(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
