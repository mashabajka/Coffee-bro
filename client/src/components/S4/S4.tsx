import React from 'react';
import styles from './S4.module.css';
import clsx from 'clsx';
import Background from '../Background/Background';
import Wrapper from '../Wrapper/Wrapper';
import img from '../../assets/images/backgrounds/3.svg'

export default function S4() {


    return (
        <Background img={img}>
      <Wrapper>
       
      <div className={styles.wrapper_content}>

        <div className={styles.container1} id='why'>
            <div className={styles.first_row}>
        <span className={styles.question}>ПОЧЕМУ</span>
           <span className={styles.name}>COFFEE BRO?</span>
           </div>
            <div className={styles.img_wrap}>
  
         <div className={styles.list}>
            <div className={styles.li}>
              <div className={styles.h5}>01</div >
              <span className={styles.bold_row}>Вы платите только за оборудование.</span>
              <br/>
              <span className={styles.row}>Отгрузка оборудования в течение недели.</span>
            </div>
            <div className={styles.li}>
            <div className={styles.h5}>02</div >
            <span className={styles.bold_row}>Техническая поддержка</span>
            <span className={styles.row}> и IT-база знаний 24/7.</span>
            </div>
            <div className={styles.li}>
            <div className={styles.h5}>03</div >
            <span className={styles.bold_row}>Обучение и поддержка партнеров.</span>
            <span className={styles.row}> Помощь с запуском.</span>
            </div>
            <div className={styles.li}>
            <div className={styles.h5}>04</div >
            <span className={styles.bold_row}>Быстрый старт</span>
            <span className={styles.row}> бизнеса с быстрой окупаемостью.</span>
            </div>

         </div>
         </div>
        </div>
        <div className={styles.container2}>

            <img src="/icons_s1/apparate1.png" alt="apparate" />
            </div>
          
</div>

      </Wrapper>  
      </Background>
      
    )
}
