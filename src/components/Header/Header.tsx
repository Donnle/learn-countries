import {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import UserMenu from "../UserMenu";
import {userDataSelector} from "../../redux/selectors";
import {IUserData} from "../../redux/store";

import styles from './Header.module.scss'


interface Props {
  userData: null | IUserData
}

const Header = ({userData}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const currRef = useRef<any>()

  const handleMenuOpen = () => setIsMenuOpen(!isMenuOpen)

  // eslint-disable-next-line
  const handleClickOutside = (event: any) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(currRef.current)) {
      setIsMenuOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  const arrayOfItems = [
    {id: 1, label: 'Карточки', link: '/cards_countries'},
    {id: 2, label: 'Уже знаю', link: '/known_countries'},
    {id: 3, label: 'Еще не знаю', link: '/unknown_countries'},
    {id: 4, label: 'Все', link: '/all_countries'},
  ]

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.flexbox}>
          <div className={styles.logo}>
            <Link to='/'>Logo</Link>
          </div>
          <div ref={currRef}>
            {userData ? <span className={styles.username} onClick={handleMenuOpen}>{userData.username}</span> :
              (<div className={styles.auth}>
                  <div className={styles.registration}>
                    <Link to='/registration'>Регистрация</Link>
                  </div>
                  <div className={styles.login}>
                    <Link to='/login'>Вход</Link>
                  </div>
                </div>
              )}
            {isMenuOpen && <UserMenu arrayOfItems={arrayOfItems}/>}
          </div>
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = (state: any) => ({
  userData: userDataSelector(state),
})

export default connect(mapStateToProps)(Header)
