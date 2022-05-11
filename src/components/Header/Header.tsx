import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {userDataSelector} from "../../redux/selectors";

import styles from './Header.module.scss'


interface Props {
  userData: any
}

const Header = ({userData}: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.flexbox}>
          <div className={styles.logo}>
            <Link to='/'>Logo</Link>
          </div>
          {userData ? <span className={styles.username}>{userData.username}</span> :
            (<div className={styles.auth}>
                <div className={styles.registration}>
                  <Link to='/registration'>Регистрация</Link>
                </div>
                <div className={styles.login}>
                  <Link to='/login'>Вход</Link>
                </div>
              </div>
            )}
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = (state: any) => ({
  userData: userDataSelector(state),
})

export default connect(mapStateToProps)(Header)
