import Background from "../Background/Background";
import Wrapper from "../Wrapper/Wrapper";
import styles from "./slide7.module.css";
import img from "../../assets/slide7/7.svg";

export default function Slide7(): JSX.Element {
  return (
    <>
      <Background img={img}>
        <Wrapper>
          <div className={styles.wrapper_content}>
            <div className={styles.hah}>
              <h1 className={styles.h}>МЫ УЖЕ ВСЕ ПОДГОТОВИЛИ</h1>
              <h2 className={styles.h2}>
                Чтобы вы создали бизнес, который не требует больших усилий,
                специфических знаний и доступен любому человеку
              </h2>
            </div>

            <div className={styles.divContainer}>
              <img className={styles.line} src="/icon_s7/Vector_13.png" />
              <div className={styles.div}>
                <div className={styles.card}>
                  <img
                    className={styles.img}
                    src="/icon_s7/Group 1.png"
                    alt="схема запуска кофейни"
                  />
                  <div className={styles.text}>
                    Внедрили IT-решение (У нас есть обширная обучающая база, а
                    наша простая бизнес-модель делает все понятным даже для
                    новичков)
                  </div>
                </div>

                <div className={styles.card2}>
                  <img
                    className={styles.img}
                    src="/icon_s7/Group 2.png"
                    alt="схема запуска кофейни"
                  />
                  <div className={styles.text}>
                    Забудьте о юридических заморочках! Мы поможем вам легко
                    открыть бизнес и подскажем все нюансы по ведению ИП.
                  </div>
                </div>
              </div>

              <div className={styles.div}>
                <div className={styles.card1}>
                  <img
                    className={styles.img}
                    src="/icon_s7/Group 3.png"
                    alt="схема запуска кофейни"
                  />
                  <div className={styles.text}>
                    Наш торговый дом готов предоставить лучшие рецептуры,
                    расходники и запасные части по самым привлекательным ценам
                    на рынке.
                  </div>
                </div>

                <div className={styles.card}>
                  <img
                    className={styles.img1}
                    src="/icon_s7/Group 4.png"
                    alt="схема запуска кофейни"
                  />
                  <div className={styles.text}>
                    Отдел технической поддержки всегда к вашим услугам, чтобы вы
                    чувствовали себя уверенно в своем бизнесе.
                  </div>
                </div>
              </div>

              <div className={styles.div}>
                <div className={styles.card}>
                  <img
                    className={styles.img1}
                    src="/icon_s7/Group 5.png"
                    alt="схема запуска кофейни"
                  />
                  <div className={styles.text}>
                    Сделали продающее дизайн-оформление
                  </div>
                </div>

                <div className={styles.card2}>
                  <img
                    className={styles.img1}
                    src="/icon_s7/Group 6.png"
                    alt="схема запуска кофейни"
                  />
                  <div className={styles.text}>
                    Разработали технологические карты напитков с лучшим бариста
                    России
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </Background>
    </>
  );
}
