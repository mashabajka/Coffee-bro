import Background from "../Background/Background";
import Wrapper from "../Wrapper/Wrapper";
import styles from "./S11.module.css";
import img from "../../assets/images/background/11.jpg";

export default function S11() {
  return (
      <div className={styles.background}>
        <div className={styles.wrapper} id="price">
          <img className={styles.beans} src='/icons_s11/beans.png'/>
          <div className={styles.apparate}>
          <img src='/icons_s11/apparate.png'/>

          </div>
          <div className={styles.top}>
          <div className={styles.star1}>
                <img src='/icons_s11/star1.svg'/>
              </div>
          <div className={styles.star2}>
                <img src='/icons_s11/star2.svg'/>
              </div>
            <div className={styles.top1}>
              <div className={styles.top3}>
                <p>COFFEE BRO</p>
                CATURA
              </div>
              <div className={styles.top4_1}>
                <p className={styles.top7}>СТИЛЬНЫЙ ДИЗАЙН</p>
                <p className={styles.top8}>Просто и со вкусом</p>
              </div>
              <div className={styles.top4_2}>
                <p className={styles.top7}>Компактный размер</p>
                <p className={styles.top8}>
                  Габариты стойки позволяют разместить ее в любом месте
                </p>
              </div>
            </div>

            <div className={styles.top5}>
              <div className={styles.star3}>
                <img src='/icons_s11/star3.svg'/>
              </div>
              <div className={styles.top6}>
                <p>1,6 МЛН</p>
                ТЕНГЕ
              </div>

              <div className={styles.top4_3}>
                <p className={styles.top7}> КОФЕМАШИНА JETTINO JL24</p>
                <p className={styles.top8}>
                  Позволяет гибко настроить рецептуру
                </p>
              </div>
            </div>
          </div>
        </div>
      {/* </Wrapper> */}
        </div>
   
  );
}
