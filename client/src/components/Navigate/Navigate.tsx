import { Link } from "react-router-dom";
import styles from "./Navigate.module.css";
// import clsx from 'clsx';

export default function Navbar() {
  return (
    <nav
      className={styles.nav}
      // style={{
      //   position: "sticky",
      //   top: 0,
      //   zIndex: 1000 /* Увеличенный z-index для перекрытия других элементов */,
      // }}
    >
      {/* <div className={styles.background}> */}
        <div className={styles.wrapper}>
          <div className={styles.wrapper1}>
            <a href="#why" className={styles.wrapper2}>
              Почему мы
            </a>
            <a href="#sxema" className={styles.wrapper2}>
              Схемы
            </a>
            <a href="#tehno" className={styles.wrapper2}>
              Технологии
            </a>
            <a href="#price" className={styles.wrapper2}>
              Стоимость
            </a>
            <a href="#contact" className={styles.wrapper2}>
              Контакты
            </a>
          </div>
          {/* <div className={styles.wrapper1_2}> */}
            <Link to={"/trade"}>
              <button className={styles.wrapper3}>Торговый Дом</button>
            </Link>
          {/* </div> */}
        </div>
      {/* </div> */}
    </nav>
  );
}

// className={clsx(styles.wrapper, styles.color)}
