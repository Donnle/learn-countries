import styles from './Loader.module.scss'

const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.loadSpinner}>
      <div className={styles.loading}>
        <div>
          <div/>
          <div/>
        </div>
      </div>
    </div>
  </div>
)

export default Loader
