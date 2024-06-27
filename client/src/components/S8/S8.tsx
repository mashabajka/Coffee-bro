import Background from '../Background/Background'
import Wrapper from '../Wrapper/Wrapper'
import styles from './S8.module.css'
import img from "../../assets/images/backgrounds/slide8.svg"



export default function S8() {
  return (
    <Background img={img}>
    <Wrapper>
    <div className={styles.wrapper_content}>
        <div className={styles.block1}>
          <p>А ЕСЛИ У МЕНЯ УЖЕ ЕСТЬ КОФЕЙНЯ?</p>
        </div>
        <div className={styles.block2}>
          <p>
          И в таком случае у нас есть что Вам предложить!
          </p>
        </div>
        <div className={styles.block3}>
          <div>COFFEE BRO</div>
          <div><img src='/icons_s9/slide8.png' alt="fdfd" className={styles.image} /></div>
          <div>COMMUNITY</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.block4}>
          <div>ТЕХНИЧЕСКАЯ ПОДДЕРЖКА</div>
          <div>ТОРГОВЫЙ ДОМ</div>
          <div>МАРКЕТИНГ</div>
        </div>
        <div className={styles.block5}>
          <p>
            ЕСЛИ У ВАС ВОЗНИКАЮТ ПРОБЛЕМЫ С ОБСЛУЖИВАНИЕМ, ИНГРЕДИЕНТАМИ ИЛИ ПРОДВИЖЕНИЕМ СОБСТВЕННОГО БИЗНЕСА ДОВЕРЬТЕСЬ ПРОФЕССИОНАЛАМ!
          </p>
        </div>
        </div>
      </Wrapper>
    </Background>
  )
}
