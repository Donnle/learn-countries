import {connect} from "react-redux";
import {notLearnedCountriesSelector} from "../../redux/selectors";
import {ICountry, IState} from "../../redux/store";

import styles from './CardsPage.module.scss'


interface Props {
  activeCountry: ICountry
  countCountries: number
  countryIndex: number
  setCountryIndex: (n: number) => void
}

const CardsPage = ({activeCountry, countCountries, countryIndex, setCountryIndex}: Props) => {
  const handlePrevCountry = () => setCountryIndex(countryIndex ? countryIndex - 1 : countCountries - 1)
  const handleNextCountry = () => setCountryIndex(countryIndex !== countCountries - 1 ? countryIndex + 1 : 0)

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.front}>
            <img alt='flag' src={activeCountry?.flag}/>
          </div>
          <div className={styles.back}>
            <span>{activeCountry?.name}</span>
          </div>
        </div>
      </div>
      <div className={styles.control}>
        <div className={styles.control__wrapper}>
          <div className={styles.flexbox}>
            <button className={styles.prev} onClick={handlePrevCountry}>
              <span>PREV</span>
            </button>
            <button className={styles.next} onClick={handleNextCountry}>
              <span>NEXT</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: IState, {countryIndex}: any) => ({
  activeCountry: notLearnedCountriesSelector(state)[countryIndex]?.country,
})

export default connect(mapStateToProps)(CardsPage)
