import styles from "./Cards.module.scss";
import Card from "../Card";

interface Props {
  filteredArray: any
}

const Cards = ({filteredArray}: Props) => {
  return (
    <ul className={styles.list}>
      {filteredArray?.map(({country, buttonBackground}: any) => <Card key={country._id} imageLink={country.flag}
                                                                      countryName={country.name}
                                                                      buttonBackgroundColor={buttonBackground}/>)}
    </ul>
  )
}

export default Cards
