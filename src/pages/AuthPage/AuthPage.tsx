import {connect} from "react-redux";
import useFormFields from "../../utils/useFormFields";
import {addUserId, loadUserInfo} from "../../redux/actions";

import styles from './AuthPage.module.scss'


interface Props {
  title: string
  buttonText: string
  callFunc: (username: string, password: string) => any
  addUserId: (s: string) => void
  loadUserInfo: (userId: string) => void
}

const AuthPage = ({title, buttonText, callFunc, addUserId, loadUserInfo}: Props) => {
  const [fields, handleFieldChange] = useFormFields({
    username: '',
    password: ''
  })

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const {data} = await callFunc(fields.username, fields.password)
      addUserId(data.userId)
    } catch (e: any) {
      console.log(e.response.data.message)
    }
  }

  return (
    <div className={styles.popup}>
      <div className={styles.wrapper}>
        <div className={styles.background}>
          <div className={styles.text}>
            <div className={styles.title}>
              <h2>{title}</h2>
            </div>
            <form onSubmit={handleFormSubmit} className={styles.form}>
              <div className={styles.formWrapper}>
                <div className={styles.login}>
                  <input id="username"
                         type="text"
                         placeholder="username"
                         value={fields.username}
                         onChange={handleFieldChange}/>
                </div>
                <div className={styles.password}>
                  <input id="password"
                         type="password"
                         placeholder="password"
                         value={fields.password}
                         onChange={handleFieldChange}/>
                </div>
              </div>
              <button className={styles.submit}>
                <span>{buttonText}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  addUserId: (s: string) => dispatch(addUserId(s)),
  loadUserInfo: (userId: string) => dispatch(loadUserInfo(userId))
})

export default connect(null, mapDispatchToProps)(AuthPage)
