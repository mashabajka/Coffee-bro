import styles from "./S9.module.css";
import img_coffee_mashine from "/icons_s9/slide9.png";
import star from "/icons_s9/star.svg";
import starBrown from "/icons_s9/star_brown.svg";
import line from "/icons_s9/line.svg";
import Background from "../Background/Background";
import Wrapper from "../Wrapper/Wrapper";

export default function S9() {
  return (
    <Background>
      <Wrapper>
        <div className={styles.wrapper_content} id="tehno">
          <div className={styles.top}>
            <p>
              <span className={styles.coloredText}>ТЕХНОЛОГИИ</span>,
              ОПЕРЕЖАЮЩИЕ КОНКУРЕНТОВ
            </p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <div className={styles.container}>
                <p>СОВРЕМЕННЫЙ ВНЕШНИЙ ВИД</p>
                <img src={star} alt="star" />
                <img src={line} alt="line" />
              </div>
              <div className={styles.container}>
                <p>ПРОМО-ВИДЕО НА ЭКРАНЕ</p>
                <img src={starBrown} alt="star" />
                <img src={line} alt="line" />
              </div>
              <div className={styles.container}>
                <p>ДАТЧИК ДВИЖЕНИЯ</p>
                <img src={star} alt="star" />
                <img src={line} alt="line" />
              </div>
              <div className={styles.container}>
                <p>ДАТЧИК СТАКАНА</p>
                <img src={starBrown} alt="star" />
                <img src={line} alt="line" />
              </div>
            </div>
            <div className={styles.center}>
              <img
                src={img_coffee_mashine}
                alt="coffee-mashine"
                className={styles.imageCoffeeMashine}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.containerRight}>
                <img src={line} alt="line" />
                <img src={starBrown} alt="star" />
                <p>УЛУЧШЕННАЯ КОФЕМОЛКА</p>
              </div>
              <div className={styles.containerRight}>
                <img src={line} alt="line" />
                <img src={star} alt="star" />
                <p>УЛУЧШЕННАЯ ЗАВАРОЧНЫЙ БЛОК</p>
              </div>
              <div className={styles.containerRight}>
                <img src={line} alt="line" />
                <img src={starBrown} alt="star" />
                <p>УВЕЛИЧЕННЫЕ БУНКЕРА НА 1 КГ</p>
              </div>
              <div className={styles.containerRight}>
                <img src={line} alt="line" />
                <img src={star} alt="star" />
                <p>ОПЛАТА QR КОДА НА ЭКРАНЕ</p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Background>
  );
}
