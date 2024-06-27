import { useState } from 'react';
import styles from './slide6.module.css';
import { useAppDispatch } from '../../redux/hooks';
import { fetchOrdersSendAdmin } from '../../redux/thunkOrders';
import Background from '../Background/Background';
import Wrapper from '../Wrapper/Wrapper';
import img from '../../assets/slide6/6.png'
// import clsx from 'clsx';

const instanceId = '1103950125';
const token = 'abe7aa900519491a83738877b52343383304ba20ca294636bc';
const chatId = '79823455042@c.us';

export default function Slide6(): JSX.Element {
  const [showPopup, setShowPopup] = useState(false); // Состояние для отслеживания видимости окна
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const togglePopup = () => {
    setShowPopup(!showPopup); // Функция для переключения состояния
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const dispatch = useAppDispatch();

  const sendMessage = async (e) => {
    e.preventDefault();

    // Формирование сообщения для WhatsApp
    const message = `📞 Заявка на обратный звонок:
                      \n Имя: ${name}\
                      \n Телефон: ${phone}`;

                      // найстроки для WhatsApp
      const url = `https://api.green-api.com/waInstance${instanceId}/SendMessage/${token}`;
      const payload = {
        chatId: chatId,
        message: message,
        linkPreview: false,
      };
 
      // 1. Отправка сообщения в WhatsApp
      await dispatch(fetchOrdersSendAdmin({ url, payload }));
      
      togglePopup();
      setName('');
      setPhone('');
  
    };
  
  return (
    <>
    

    <Background img={img}>
        <Wrapper>
          <div className={styles.wrapper_content}>
      <h1 className={styles.h} id="sxema">
        СХЕМА ЗАПУСКА КОФЕЙНИ
      </h1>
      <div className={styles.divContainer}>

       <div className={styles.div1}>

        <div className={styles.card}>
          <h5 className={styles.h5}>01</h5 >
          <div className={styles.crap}>
          <img className={styles.img} src="../../public/icon_s6/Group 1.png" alt="схема запуска кофейни"/>
          <div className={styles.text}>
            <p>Получить консультацию</p>
            от менеджера
            
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h5 className={styles.h5}>02</h5 >
          <div className={styles.crap}>
          <img className={styles.img} src="../../public/icon_s6/Group 2.png" alt="схема запуска кофейни"/>
          <div className={styles.text}>
            <p>Заключить договор</p>
            и оплатить оборудование
            </div>
          </div>
        </div>


      </div>

      <div className={styles.div2}>

      <div className={styles.card}>
          <h5 className={styles.h5}>03</h5 >
          <div className={styles.crap}>
          <img className={styles.img} src="../../public/icon_s6/Group 3.png" alt="схема запуска кофейни"/>
          <div className={styles.text}>
            Пройти обучение по
            обслуживанию, получить план
            развития и подобрать локации
             </div>
          </div>
        </div>

        <div className={styles.card}>
          <h5 className={styles.h5}>04</h5 >
          <div className={styles.crap}>
          <img className={styles.img} src="../../public/icon_s6/Group 4.png" alt="схема запуска кофейни"/>
          <div className={styles.text}>Получить оборудование</div>
          </div>
        </div>

      </div>

      <div className={styles.div3}>

      <div className={styles.card3}>
          <h5 className={styles.h5}>05</h5 >
          <div className={styles.crap}>
          <img className={styles.img} src="../../public/icon_s6/Group 5.png" alt="схема запуска кофейни"/>
          <div className={styles.text}>Расставить оборудование в городе и получить первую прибыль</div>
          <div className={styles.mini}>
            <p>Стабильно зарабатываешь</p>
           от 150 000 тг в месяц с одной кофейни</div>
          <div className={styles.mini}>
          <p> От подписания до первой прибыли</p>
             21 день</div>
          <button className={styles.btn} onClick={togglePopup}>Узнать больше</button>
          </div>
        </div>

      </div>


      </div>
      </div>
      {showPopup && ( /* Показываем всплывающее окно только если showPopup равно true */
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <span className={styles.closeBtn} onClick={togglePopup}>×</span> {/* Кнопка закрытия окна */}
            <h2 className={styles.h2}>Обратный звонок</h2>
            <form className={styles.form} onSubmit={sendMessage}>
              <input className={styles.input} type="text" placeholder="Имя" value={name} onChange={handleNameChange}/>
              <input className={styles.input} type="tel" placeholder="Номер телефона" value={phone} onChange={handlePhoneChange}/>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" defaultChecked />
                Я согласен на обработку персональных данных
              </label>
              <button type="submit" className={styles.submitBtn}>Отправить</button>
            </form>
          </div>
        </div>
      )}
  
    </Wrapper>
    </Background>

    </>
  );
};