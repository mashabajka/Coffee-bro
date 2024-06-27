import styles from './S15.module.css'
import logo1 from '../../assets/images/background/logo1.png'; // Путь к вашему изображению
import logo2 from '../../assets/images/background/logo2.png'; // Путь к вашему изображению
import Background from '../Background/Background';
import Wrapper from '../Wrapper/Wrapper';
import img from '../../assets/images/background/15.jpg'



export default function S15() {
  return (
    <Background img={img}>
    <Wrapper>
    <div className={styles.wrapper_content} id="contact">
      <div className={styles.top}>
        <p>
          <span className={styles.coloredText}>
            ЗАИНТЕРЕСОВАЛИ? 
          </span>
          <span > ПИШИТЕ!</span> 
        </p> 
      </div>
      <div className={styles.container}>
         <div className={styles.mini}>
                <div className={styles.pic}>
                <img src={logo1} alt="Логотип" />
                </div>
                     
                      <div> <a href={"https://api.whatsapp.com/message/23NUWWD3KD6KL1?autoload=1&app_absent=0"} className={styles.btn2} target="_blank" rel="noopener noreferrer">
                         <button className={styles.btn}>WHATSAPP</button>
                      </a></div>
                <div className={styles.mini2}>По всем интересующим вопросам</div>
         </div>
           <div className={styles.mini}>
                 <div className={styles.pic}>
                <img src={logo2} alt="Логотип" />
                 </div>
                 <div> <a href={"https://www.youtube.com/channel/UCOl1E7FNJxoE0w9DRfqz_kA"} className={styles.btn2} target="_blank" rel="noopener noreferrer">
                         <button className={styles.btn}>YOUTUBE</button>
                      </a></div>
                 <div className={styles.mini2}>Много интересного</div>
           </div>
        </div>
        </div>
      </Wrapper>
      
    </Background>
  )
}

