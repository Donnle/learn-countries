import styles from './CountriesPage.module.scss'
import Cards from "../../components/Cards";

interface Props {
  filteredArray: any
}

const CountriesPage = ({filteredArray}: Props) => {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Cards filteredArray={filteredArray}/>
      </div>
    </main>
  )
}

export default CountriesPage
