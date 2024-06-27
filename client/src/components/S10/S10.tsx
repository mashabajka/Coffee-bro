import styles from './S10.module.css'
import img from '../../assets/images/backgrounds/slide10.svg'
import Background from '../Background/Background'
import Wrapper from '../Wrapper/Wrapper'

export default function S10() {
  return (
    <Background img={img}>
    <Wrapper>
    <div className={styles.wrapper_content}>
        <div className={styles.block1}>
          <p>НАШ ПРОДУКТ - ВАШ ПРОДУКТ</p>
        </div>
        <div className={styles.block2}>
          <p>
            Мы готовы поделиться с вами нашими знаниями и опытом в кофейной индустрии через наш новый продукт, в котором мы учли все возможные проблемы с которыми сталкивался каждый наш клиент
          </p>
        </div>
        <div className={styles.block3}>
          <p>
            МЫ НЕ ФРАНШИЗА. У НАС НЕТ
          </p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.block4}>
          <div>РОЯЛТИ</div>
          <div>ГРАНИЦ</div>
          <div>СКРЫТЫХ УСЛОВИЙ</div>
        </div>
        <div className={styles.block5}>
          <p>
            НЕ ПЕРЕПЛАЧИВАЙТЕ ЗА ФРАНШИЗУ, ПОКУПАЙТЕ У ПРОИЗВОДИТЕЛЯ НАПРЯМУЮ И ПОЛУЧАЙТЕ ТОЛЬКО ЛУЧШЕЕ!
          </p>
        </div>
        </div>
      </Wrapper>
    </Background>
  )
}
