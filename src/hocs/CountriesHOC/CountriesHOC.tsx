import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Navigate, Route, Routes} from "react-router";
import CountriesPage from "../../pages/CountriesPage/CountriesPage";
import {IFilteredCountry, IState, IUserData} from "../../redux/store";
import {
  allCountriesSelector,
  countriesLoadedSelector,
  countriesLoadingSelector,
  learnedCountriesSelector,
  notLearnedCountriesSelector,
  userDataSelector
} from "../../redux/selectors";
import {loadCountries} from "../../redux/actions";
import CardsPage from "../../pages/CardsPage";

interface Props {
  learnedCountries: IFilteredCountry[]
  notLearnedCountries: IFilteredCountry[]
  allCountries: IFilteredCountry[]
  loadCountries: () => void
  loading: boolean
  loaded: boolean
  userData: null | IUserData
}

const CountriesHoc =
  ({learnedCountries, notLearnedCountries, allCountries, loadCountries, loading, loaded, userData}: Props) => {
    const [countryIndex, setCountryIndex] = useState<number>(0)

    useEffect(() => {
      if (userData && !loaded && !loading) loadCountries()
    }, [userData, loaded, loading, loadCountries])
    if (!loaded && loading) return <p>Loading...</p>

    return (
      <Routes>
        <Route path='cards' element={<CardsPage countCountries={notLearnedCountries.length}
                                                countryIndex={countryIndex}
                                                setCountryIndex={setCountryIndex}/>}/>
        <Route path='known' element={<CountriesPage filteredArray={learnedCountries}/>}/>
        <Route path='unknown' element={<CountriesPage filteredArray={notLearnedCountries}/>}/>
        <Route path='all' element={<CountriesPage filteredArray={allCountries}/>}/>
        <Route path='*' element={<Navigate replace to='cards'/>}/>
        <Route path='' element={<Navigate replace to='/'/>}/>
      </Routes>
    )
  }

const mapStateToProps = (state: IState) => ({
  userData: userDataSelector(state),
  loading: countriesLoadingSelector(state),
  loaded: countriesLoadedSelector(state),
  learnedCountries: learnedCountriesSelector(state),
  notLearnedCountries: notLearnedCountriesSelector(state),
  allCountries: allCountriesSelector(state),
})
const mapDispatchToProps = (dispatch: any) => ({
  loadCountries: () => dispatch(loadCountries())
})

export default connect(mapStateToProps, mapDispatchToProps)(CountriesHoc)
