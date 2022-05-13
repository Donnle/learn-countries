import styles from './Info.module.scss'


interface Props {
  title: string
  subtitle: string
}

const Info = ({title, subtitle}: Props) => {
  return (
    <div className={styles.info}>
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <h1>{title}</h1>
          </div>
          <div className={styles.subtitle}>
            <p>
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
