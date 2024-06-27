import { Link } from 'react-router-dom';
import styles from "./Error.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper_content}>
      <h1>404 - Страница не найдена</h1>
      <p>К сожалению, произошла ошибка.</p>
      <Link to={'/'}>
        <button className={styles.btn}>перейти на Главную</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;