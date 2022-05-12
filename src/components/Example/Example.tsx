import styles from './Example.module.scss'
import {Link} from "react-router-dom";

interface Props {
  title: string
  imageLink: string
  backText: string
}

const Example = ({title, backText, imageLink}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
      </div>
      <div className={styles.card__flexbox}>
        <div className={styles.card}>
          <div className={styles.front}>
            <img
              alt="flag"
              src={imageLink}
            />
          </div>
          <div className={styles.back}>
            <Link to="/registration">{backText}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Example
