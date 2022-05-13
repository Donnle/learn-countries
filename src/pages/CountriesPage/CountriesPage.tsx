import styles from './CountriesPage.module.scss'
import Cards from "../../components/Cards";
import {connect} from "react-redux";
import {loadCountries} from "../../redux/actions";
import {loadedCountriesSelector, loadingCountriesSelector, userDataSelector} from "../../redux/selectors";
import {useEffect} from "react";

interface Props {
  userData: any
  loadCountries: any
  loading: boolean
  loaded: boolean
  filteredArray: any
}

const CountriesPage = ({userData, loadCountries, loaded, loading, filteredArray}: Props) => {
  useEffect(() => {
    if (userData && !loaded && !loading) loadCountries()
  }, [loadCountries, loaded, loading, userData])

  if (!loaded && loading) return <p>Loading...</p>
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Cards filteredArray={filteredArray}/>
      </div>
    </main>
  )
}

const mapStateToProps = (state: any) => ({
  loading: loadingCountriesSelector(state),
  loaded: loadedCountriesSelector(state),
  userData: userDataSelector(state),
})

const mapDispatchToProps = (dispatch: any) => ({
  loadCountries: () => dispatch(loadCountries()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CountriesPage)