import {Link} from "react-router-dom";

import styles from './Header.module.scss'
import {loadedSelector, loadingSelector, userDataSelector} from "../../redux/selectors";
import {connect} from "react-redux";


interface Props {
  userData: any
  loading: boolean
  loaded: boolean
}

const Header = ({userData, loaded, loading}: Props) => {
  console.log(userData)
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.flexbox}>
          <div className={styles.logo}>
            <Link to='/'>Logo</Link>
          </div>
          {
            userData ? <p>{userData.username}</p> :
              (<div className={styles.auth}>
                  <div className={styles.registration}>
                    <Link to='/registration'>Регистрация</Link>
                  </div>
                  <div className={styles.login}>
                    <Link to='/login'>Вход</Link>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = (state: any) => ({
  userData: userDataSelector(state),
  loading: loadingSelector(state),
  loaded: loadedSelector(state),
})

export default connect(mapStateToProps)(Header)
