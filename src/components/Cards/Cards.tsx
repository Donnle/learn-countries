import Card from "../Card";
import {IFilteredCountry} from "../../redux/store";

import styles from "./Cards.module.scss";


interface Props {
  filteredArray: IFilteredCountry[]
}

const Cards = ({filteredArray}: Props) => (
  <ul className={styles.list}>
    {filteredArray?.map(({country, isLearned}: IFilteredCountry) =>
      <Card key={country._id} countryId={country._id}
            imageLink={country.flag} countryName={country.name} isLearned={isLearned}/>
    )}
  </ul>
)


export default Cards
