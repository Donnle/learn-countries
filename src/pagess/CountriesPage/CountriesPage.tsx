import Cards from "../../components/Cards";
import {IFilteredCountry} from "../../redux/store";

import styles from './CountriesPage.module.scss'


interface Props {
  filteredArray: IFilteredCountry[]
}

const CountriesPage = ({filteredArray}: Props) => (
  <div className={styles.wrapper}>
    <Cards filteredArray={filteredArray}/>
  </div>
)


export default CountriesPage
