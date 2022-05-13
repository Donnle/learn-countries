import Card from "../Card";
import {IFilteredCountry} from "../../redux/store";

import styles from "./Cards.module.scss";


interface Props {
  filteredArray: IFilteredCountry
}

const Cards = ({filteredArray}: Props) => {
  return (
    <ul className={styles.list}>
      {Object.values(filteredArray)?.map(({country, isLearned}: any) =>
        <Card key={country._id} imageLink={country.flag} countryName={country.name} isLearned={isLearned}/>
      )}
    </ul>
  )
}

export default Cards
