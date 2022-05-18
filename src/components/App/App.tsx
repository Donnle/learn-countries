import {useEffect} from "react";
import {connect} from "react-redux";
import {Navigate, Route, Routes} from 'react-router';
import MainPage from "../../pages/MainPage";
import CountriesHoc from "../../hocs/CountriesHOC";
import AuthHoc from "../../hocs/AuthHOC";
import Header from '../Header'
import Footer from "../Footer";
import Loader from "../Loader";
import {userDataLoadedSelector, userDataLoadingSelector, userIdSelector} from "../../redux/selectors";
import {loadUserInfo} from "../../redux/actions";

import styles from './App.module.scss'


interface Props {
  userId: string
  loadUserInfo: (userId: string) => void
  loading: boolean
  loaded: boolean
}

const App = ({userId, loadUserInfo, loading, loaded}: Props) => {
  useEffect(() => {
    if (userId) loadUserInfo(userId)
  }, [userId, loadUserInfo])
  if (!loaded && loading) return <Loader/>

  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.main}>
        <Routes>
          <Route path='' element={<MainPage/>}/>
          <Route path='auth/*' element={userId ? <Navigate replace to='/'/> : <AuthHoc/>}/>
          <Route path='countries/*' element={userId ? <CountriesHoc/> : <Navigate replace to='/'/>}/>
          <Route path='*' element={<Navigate replace to='/'/>}/>
        </Routes>
      </div>
      <Footer title="Created by " link="https://github.com/Donnle" linkText="@Donnle"/>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  userId: userIdSelector(state),
  loading: userDataLoadingSelector(state),
  loaded: userDataLoadedSelector(state)
})
const mapDispatchToProps = (dispatch: any) => ({
  loadUserInfo: (userId: string) => dispatch(loadUserInfo(userId)),
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
