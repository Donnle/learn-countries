import styles from './Footer.module.scss'

interface Props {
  title: string
  link: string
  linkText: string
}

const Footer = ({title, link, linkText}: Props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.background}>
        <div className={styles.text}>
          <h2 className={styles.title}>
            {title}<a href={link}>{linkText}</a>
          </h2>
        </div>
      </div>
    </footer>
  )
}

export default Footer
