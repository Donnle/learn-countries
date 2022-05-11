import Hero from "../../components/Hero"
import Info from "../../components/Info";
import Example from "../../components/Example";

import styles from './MainPage.module.scss'


interface Props {
}

const MainPage = (props: Props) => {
  return (
    <main className={styles.main}>
      <Hero
        title='Сайт для изучения флагов'
        subtitle='Изучение флагов - отличный способ улучшить память!'
        buttonText='Начать'
      />
      <Info
        title='Изучение по системе Лейтнера'
        subtitle='Система Лейтнера — широко используемый метод для
                эффективного запоминания и повторения с помощью
                флэш-карточек, предложенный немецким ученым и журналистом
                Себастьяном Лейтнером в 70-е годы XX века.'
      />
      <Example
        title='Наведи на флаг'
        imageLink="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1200px-Flag_of_Ukraine.svg.png?20100406171642"
        backText="Начать"
      />
    </main>
  )
}

export default MainPage
