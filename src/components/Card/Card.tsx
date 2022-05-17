import {connect} from "react-redux";
import {addLearnedCountry, removeLearnedCountry} from "../../redux/actions";

import styles from "./Card.module.scss";


interface Props {
  countryId: string
  imageLink: string
  countryName: string
  isLearned: boolean
  buttonText?: string
  addLearnedCountry: () => void
  removeLearnedCountry: () => void
}

const Card = ({imageLink, countryName, isLearned, buttonText, addLearnedCountry, removeLearnedCountry}: Props) => (
  <li className={styles.card}>
    <div className={styles.img}>
      <img alt="flag" src={imageLink}/>
    </div>
    <div className={styles.text}>
      <div className={styles.title}>
        <h2>{countryName}</h2>
      </div>
      <button onClick={isLearned ? removeLearnedCountry : addLearnedCountry} className={styles.button}
              style={{backgroundColor: isLearned ? '#75FF83' : '#FF7575'}}>
        <span>{buttonText || 'уже знаю'}</span>
      </button>
    </div>
  </li>
)


const mapDispatchToProps = (dispatch: any, props: any) => ({
  addLearnedCountry: () => dispatch(addLearnedCountry(props)),
  removeLearnedCountry: () => dispatch(removeLearnedCountry(props)),
})

export default connect(null, mapDispatchToProps)(Card)
