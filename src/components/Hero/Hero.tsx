import {Link} from 'react-router-dom'
import styles from './Hero.module.scss'

interface Props {
  title: string
  subtitle: string
  buttonText: string
}

const Hero = ({title, subtitle, buttonText}: Props) => {
  return (
    <div className={styles.hero}>
      <div className={styles.wrapper}>
        <div className={styles.background}>
          <div className={styles.text}>
            <div className={styles.title}>
              <h1>{title}</h1>
            </div>
            <div className={styles.subtitle}>
              <p>{subtitle}</p>
            </div>
          </div>
          <button className={styles.button}>
            <Link to="/registration">{buttonText}</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
