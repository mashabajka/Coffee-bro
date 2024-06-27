import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './S1.module.css';
import { fetchOrdersSendAdmin } from '../../redux/thunkOrders';
import { useAppDispatch } from '../../redux/hooks';
import Background from '../Background/Background';
import img from "../../assets/images/backgrounds/1.svg"
import Wrapper from '../Wrapper/Wrapper';

const instanceId = '1103950125';
const token = 'abe7aa900519491a83738877b52343383304ba20ca294636bc';
const chatId = '79823455042@c.us';

export default function S1() {
  const [showPopup, setShowPopup] = useState(false); 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isAgree, setIsAgree] = useState(true);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    // Фильтруем ввод пользователя, оставляем только цифры и символ +
    let formattedPhone = e.target.value.replace(/[^\d+]/g, '');
    // Убираем начальный символ "+", если он был введен не первым
    if (formattedPhone[0] !== '+') {
      formattedPhone = '+' + formattedPhone.replace(/\+/g, '');
    }
    setPhone(formattedPhone);
  };

  const handleCheckboxChange = (e) => {
    setIsAgree(e.target.checked); 
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
    <Background img={img}>
      <Wrapper>
      <div className={styles.wrapper_content}>
        <div className={styles.container1}>
          <div className={styles.logo_name_wrapper}>
            <div className={styles.logo}>
              <img src='/icons_s1/2.png' alt='logo' />
            </div>
            <div className={styles.name}>COFFEE BRO</div>
          </div>
          <div className={styles.text}>
            <p className={styles.slogan}>
              СТАНЬ ЧАСТЬЮ
              <br />
              КОФЕЙНОЙ ИНДУСТРИИ
            </p>
            <p className={styles.description}>
              Открой свою мини-кофейню без франшизы
              <br />
              и зарабатывай <span className={styles.bold}>от 150 000 тенге в месяц!</span>
            </p>
          </div>
          <div>
            <button className={styles.btn} onClick={togglePopup}>Обратный звонок</button> {/* Добавляем обработчик клика */}
          </div>
          <div className={styles.phone}>
            НОМЕР ОТДЕЛА ПРОДАЖ
            <br />
            <a className={styles.link} href="https://wa.me/message/23NUWWD3KD6KL1" target="_blank"><span>+7 (999) 586-07-65 WhatsApp</span></a>
          </div>
        </div>
        <div className={styles.container2}>
          <img src="/icons_s1/beans.png" alt="apparate" />
          <img src="/icons_s1/apparate1.png" alt="apparate" />
        </div>
      {/* </div> */}
      </div>
      {showPopup && ( /* Показываем всплывающее окно только если showPopup равно true */
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <span className={styles.closeBtn} onClick={togglePopup}>×</span> {/* Кнопка закрытия окна */}
            <h2 className={styles.h2}>Обратный звонок</h2>
            <form className={styles.form} onSubmit={sendMessage}>
              <input className={styles.input} type="text" placeholder="Имя" value={name} onChange={handleNameChange} required/>
              <input className={styles.input} type="tel" placeholder="Номер телефона" value={phone} onChange={handlePhoneChange} required/>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={isAgree} onChange={handleCheckboxChange} />
                <span> 
                    <a href="https://docs.google.com/document/d/1ZoQO-zkfZzUFztzPQh7sBNAB1yGyC5Q7TvlT8JD5ZLE/edit?usp=sharing" target="_blank" rel="noopener noreferrer"> Я согласен на обработку персональных данных</a>
                </span>
              </label>
              <button type="submit" className={styles.submitBtn} disabled={!isAgree}>Отправить</button>
            </form>
          </div>
        </div>
      )}
      </Wrapper>
      </Background>
  );
}
