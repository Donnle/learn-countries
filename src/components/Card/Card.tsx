import styles from "./Card.module.scss";

interface Props {
  imageLink: string
  countryName: string
  isLearned?: string
  buttonText?: string
}

const Card = ({imageLink, countryName, buttonText, isLearned}: Props) => {
  return (
    <li className={styles.card}>
      <div className={styles.img}>
        <img alt="flag" src={imageLink}/>
      </div>
      <div className={styles.text}>
        <div className={styles.title}>
          <h2>{countryName}</h2>
        </div>
        <button className={styles.button} style={{backgroundColor: isLearned ? '#75FF83' : '#FF7575'}}>
          <span>{buttonText || 'уже знаю'}</span>
        </button>
      </div>
    </li>
  )
}

export default Card
