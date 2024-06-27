import styles from "./S13.module.css";

export default function S13() {
  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <img className={styles.beans} src="/icons_s11/beans.png" />
        <div className={styles.apparate}>
          <img src="/icons_s13/apparate.png" />
        </div>
        <div className={styles.top}>
          <div className={styles.star1}>
            <img src="/icons_s13/star1.svg" />
          </div>
          <div className={styles.star2}>
            <img src="/icons_s13/star2.svg" />
          </div>
          <div className={styles.top1}>
            <div className={styles.top3}>
              <p>COFFEE BRO</p>
              TYPIKA
            </div>
            <div className={styles.top4_1}>
              <p className={styles.top7}>ИНДИВИДУАЛЬНЫЙ БРЕНДИНГ</p>
              <p className={styles.top8}>Согласуем и сделаем ваш дизайн</p>
            </div>
            <div className={styles.top4_2}>
              <p className={styles.top7}>ЭРГОНОМИЧНЫЙ ДИЗАЙН</p>
              <p className={styles.top8}>
                Расходников вместится на 600-800 продаж
              </p>
            </div>
          </div>

          <div className={styles.top5}>
            <div className={styles.star3}>
              <img src="/icons_s13/star3.svg" />
            </div>
            <div className={styles.star4}>
              <img src="/icons_s13/star4.svg" />
            </div>
            <div className={styles.top6}>
              <p>от 2 МЛН</p>
              ТЕНГЕ
            </div>
            <div className={styles.top4_3}>
              <p className={styles.top7}> АВТОВЫДАЧА СТАКАНОВ</p>
              <p className={styles.top8}>Снижает вандализм</p>
            </div>
            <div className={styles.top4_4}>
              <p className={styles.top7}>КОФЕМАШИНА JETTINO JL24</p>
              <p className={styles.top8}>Позволяет гибко настроить рецептуру</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
