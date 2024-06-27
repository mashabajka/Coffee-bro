import { Link } from 'react-router-dom';
import styles from './NavigateBasket.module.css';
// import clsx from 'clsx';


export default function NavbarBasket() {
  return (
    <nav className={styles.nav} style={{ position: 'sticky', top: 0, zIndex: 1000 /* Увеличенный z-index для перекрытия других элементов */}}>
<div className={styles.background} >
<div className={styles.wrapper}>
    
      <Link to={'/'}>
        <button className={styles.wrapper3}>Главная</button>
      </Link>
      <Link to={'/trade'}>
        <button className={styles.wrapper3}>Торговый Дом</button>
      </Link>
   
</div>  
</div>
</nav>
  );
}

