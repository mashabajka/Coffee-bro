import React from 'react'
import styles from './S2.module.css'
import clsx from 'clsx';
import Background from '../Background/Background';
import Wrapper from '../Wrapper/Wrapper';
import img from '../../assets/images/backgrounds/2.svg'

export default function S2() {


    return (
      <Background img={img}>
      <Wrapper>
        <div className={styles.container1}>
          <div className={styles.header}>МЫ РАССЧИТАЛИ 
          <br/>
          ВАШУ ПРИБЫЛЬ</div>
        <div className={styles.description}>
        Мы детально проанализировали прибыльность нашей кофейни, включая себестоимость напитков, и готовы продемонстрировать все показатели из финансовой модели. 
<br/>
<br/>

Результаты показывают, что текущая прибыль — это лишь начало. С уверенностью можем сказать, что при расширении бизнеса и открытии дополнительных кофеен прибыль значительно возрастёт.
        </div>
        <div>
            <a href='https://docs.google.com/spreadsheets/d/15SoOCKp-5-Q76A1RsF31aXO1kuEbFU6vb3vTWKdlOl4/edit?gid=1283508735#gid=1283508735' target="_blank"><button className={styles.btn}>ПОСМОТРЕТЬ РАСЧЕТ</button></a>
           </div>
        </div>
      
        


      </Wrapper>  
</Background>
    )
}
