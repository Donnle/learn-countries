import {Link} from "react-router-dom";

import styles from './UserMenu.module.scss'


interface Items {
  id: number
  label: string
  link: string
}

interface Props {
  arrayOfItems: Items[]
}

const UserMenu = ({arrayOfItems}: Props) => (
  <div className={styles.userMenu}>
    <ul className={styles.flexbox}>
      {arrayOfItems.map(({id, label, link}: Items) =>
        <li className={styles.item} key={id}>
          <Link to={link}>{label}</Link>
        </li>
      )}
    </ul>
  </div>
)

export default UserMenu
