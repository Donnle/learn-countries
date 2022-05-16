import {useEffect} from "react";
import {connect} from "react-redux";
import {
  countriesLoadedSelector,
  countriesLoadingSelector,
  notLearnedCountriesSelector,
  userDataSelector
} from "../../redux/selectors";
import {loadCountries} from "../../redux/actions";
import {IFilteredCountry, IState, IUserData} from "../../redux/store";

import styles from './CardsPage.module.scss'


interface Props {
  userData?: null | IUserData
  loadCountries?: () => void
  loading?: boolean
  loaded?: boolean
  setActiveCountryId: (n: number) => void
  activeCountryId: number
  activeCountryData?: IFilteredCountry
  activeCountries?: any
}

const CardsPage =
  ({
     setActiveCountryId,
     activeCountryId,
     activeCountryData,
     userData,
     loadCountries,
     loaded,
     loading,
     activeCountries
   }: Props) => {
    const handlePrevCountry = () =>
      setActiveCountryId(activeCountryId ? activeCountryId - 1 : activeCountries.length - 1)
    const handleNextCountry = () =>
      setActiveCountryId(activeCountryId < activeCountries.length - 1 ? activeCountryId + 1 : 0)

    useEffect(() => {
      if (userData && !loaded && !loading) loadCountries?.()
    }, [loadCountries, loaded, loading, userData])

    if (!loaded && loading) return <p>Loading...</p>

    const name = activeCountryData?.country?.name
    const flag = activeCountryData?.country?.flag

    return (
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.front}>
              <img alt='flag' src={flag}/>
            </div>
            <div className={styles.back}>
              <span>{name}</span>
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
      </div>
    )
  }

const mapStateToProps = (state: IState, props: Props) => ({
  activeCountries: notLearnedCountriesSelector(state),
  activeCountryData: notLearnedCountriesSelector(state)[props.activeCountryId],
  userData: userDataSelector(state),
  loading: countriesLoadingSelector(state),
  loaded: countriesLoadedSelector(state),
})

const mapDispatchToProps = (dispatch: any) => ({
  loadCountries: () => dispatch(loadCountries()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CardsPage)
