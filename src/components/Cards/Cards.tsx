import Card from "../Card";
import {IFilteredCountry} from "../../redux/store";

import styles from "./Cards.module.scss";


interface Props {
  filteredArray: Array<IFilteredCountry>
}

const Cards = ({filteredArray}: Props) => {
  return (
    <ul className={styles.list}>
      {filteredArray?.map(({country, isLearned}: IFilteredCountry) =>
        <Card key={country._id} imageLink={country.flag} countryName={country.name} isLearned={isLearned}/>
      )}
    </ul>
  )
}

export default Cards
