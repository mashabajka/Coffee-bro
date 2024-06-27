import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import LOGOTIP from '../../assets/images/background/LOGOTIP.png'; // Путь к вашему изображению
// import clsx from 'clsx';


export default function Footer() {
  return (
    <nav >
<div className={styles.background} >
<div className={styles.wrapper}>
    <div className={styles.wrapper12}>
                <div >
                <img src={LOGOTIP} alt="Логотип" />
                </div>
                <div className={styles.wrapper1}>
        <p>
          <span className={styles.coloredText}>
          «Smart» — франшиза сети автоматических
          </span></p> 
          <p> <span className={styles.coloredText}>кофеен самообслуживания</span> 
        </p> 
      </div>
    
   </div >
   <div className={styles.wrapper1}>
        <p>
          <span className={styles.coloredText1}>
          КОНТАКТЫ 
          </span ></p> 
          <p> <span className={styles.coloredText}>Телефон: +7 (717) 272-72-30</span> 
        </p> 
        <p>
          <span className={styles.coloredText}>
          E-mail: smartcoffeeru@mail.ru
          </span></p> 
          <p>
          <span className={styles.coloredText}>
          «Smart» — франшиза сети автоматических  
          </span></p> 
          <p>
          <span className={styles.coloredText}>
          кофеен самообслуживанияТОО «Smart
          </span></p> 
          <p>
          <span className={styles.coloredText}>
          Coffee LTD»
          </span></p> 
          <p>
          <span className={styles.coloredText}>
          Директор: Габдрахманов Артем Уралович
          </span></p> 
          <p>
          <span className={styles.coloredText}>
          Юр. адрес: г. Алматы, р-он Бостандыкский,
          </span></p> 
          <p>
          <span className={styles.coloredText}>
          ул. Жандосова, д. 60а
          </span></p> 

      </div> 
      <div className={styles.wrapper1}>
        <p>
          <span className={styles.coloredText1}>
          ИНФОРМАЦИЯ
          </span></p> 
          
          <a href="#why" className={styles.coloredText}>Политика конфиденциальности</a>
<a href="#sxema" className={styles.coloredText}>Пользовательское соглашение</a>
<a href="#tehno" className={styles.coloredText}> Оферта</a>
<a href="#price" className={styles.coloredText}>Доставка и оплата</a>
      </div>
</div>  
</div>
</nav>
  );
}