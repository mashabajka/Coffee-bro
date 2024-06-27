import React from 'react'
import styles from './S5.module.css'
import img from "../../assets/images/backgrounds/5.svg"
import Background from '../Background/Background'
import Wrapper from '../Wrapper/Wrapper'


export default function S5() {
    

    return (
        <>
      <Background img={img}>
      <Wrapper>
      <div className={styles.wrapper_content}>
            <div className={styles.main_container}>
            <div className={styles.container1}>
            <div className={styles.h}>
        ЭТО ИДЕАЛЬНЫЙ БИЗНЕС<br/>
        ДЛЯ НАЧАЛА ПУТИ
      </div>
            </div>
            <div className={styles.container2}>
                <div className={styles.one_card}>
                    <img src='/icons_s5/Frame.png'/>
               
                
                    <span className={styles.header}>БЫСТРЫЙ РОСТ РЫНКА</span>
                  
                    <p className={styles.text}>Ни смотря ни на что, люди пьют больше и больше кофе. Установив кофейню в удачном месте, вы никогда не останетесь без прибыли.</p>

                    </div>
                <div className={styles.second_div}>
                <div className={styles.block}><img src='/icons_s5/без.png'/></div>
                <div className={styles.two_cards}>
                <div className={styles.white_card}>
                <span className={styles.header}>СОТРУДНИКОВ</span>
                <p className={styles.text}>Тебе понадобится один человек, когда твоя сеть вырастет до 5–7 кофеен.</p>
                </div>
                <div className={styles.white_card}>
                <span className={styles.header}>ПОЛНОЙ ЗАНЯТОСТИ</span>
                <p className={styles.text}>Ты работаешь максимум 30 мин. в день, кофейня — минимум 12 часов.</p>
                </div>

                </div>
                    
                </div>

            </div>
            </div>
            </div>
        </Wrapper>
    </Background>
        </>
    )
}
