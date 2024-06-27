import { ChangeEvent, useEffect, useState } from 'react';
import styles from './Order.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { RootState } from '../../redux/store';
import { fetchOrdersAdd, fetchOrdersEmail, fetchOrdersSendAdmin, fetchOrdersSendClient } from '../../redux/thunkOrders';
import { useNavigate } from 'react-router-dom';

const instanceId = '1103950125';
const token = 'abe7aa900519491a83738877b52343383304ba20ca294636bc';
const chatId = '79823455042@c.us';

type InputsType = {
  name: string;
  phone: string;
  email: string;
  communication: string;
  telegramUsername?: string;
  comment_client: string;
  status: boolean;
  status_collect: boolean;
  comment_admin: string;
};

export default function Order() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scriptLoaded = useAppSelector((state: RootState) => state.scriptSlice.loaded);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (scriptLoaded) {
      initializeCart();
    }
  }, [scriptLoaded])

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    // const orderedGoods = localStorage.getItem('cart').map((el) => )
    let modifiedArray = cartItems.map((item) => {
      let newItem = { ...item };
      newItem.count = newItem.quantity;
      newItem.price = newItem.priceDiscount;
      delete newItem.quantity;
      return newItem;
    });

    
    setCartItems(modifiedArray);
  }, []);

  const [inputs, setInputs] = useState<InputsType>({
    name: '',
    phone: '',
    email: '',
    communication: 'phone',
    comment_client: '', // Инициализируем поле комментария пустой строкой
    status: false,
    status_collect: false,
    comment_admin: '',
  });

  const dispatch = useAppDispatch();

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let formattedPhone = e.target.value.replace(/[^\d+]/g, '');
    if (formattedPhone[0] !== '+') {
      formattedPhone = '+' + formattedPhone.replace(/\+/g, '');
    }
    setInputs((prev) => ({ ...prev, phone: formattedPhone }));
  };

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    const sum = cartItems.reduce((acc, el) => { return acc + el.count * el.priceDiscount }, 0)
    try {
      const orderData = {
        inputs: {
          ...inputs,
          productList: cartItems,
          sum,
          status: false,
          status_collect: false,
          comment_admin: '',
        },
      };
      
      // Формирование сообщения для WhatsApp АДМИН
      const items = cartItems.map((el, index) => `${index + 1}. ${el.name} - ${el.count} шт. * ${el.priceDiscount} ₸ = ${el.count * el.priceDiscount} ₸`).join('\n');
      const message = `❗Новый заказ ${sum} ₸:
                      \n Клиент: ${inputs.name}\
                      \n Телефон: ${inputs.phone}\
                      \n E-mail: ${inputs.email}\
                      \n Cпособ связи: ${inputs.communication}\
                      ${inputs.communication === 'telegram' ? `\n Ник в Telegram: ${inputs.telegramUsername}` : ''}\
                      \n Комментарий: ${inputs.comment_client}
                      \n Состав заказа:\
                      \n ${items}`;

    const messageToClient = `🤩 Спасибо за Ваш заказ. Мы скоро свяжемся с вами.  ${sum} ₸:
                      \n Клиент: ${inputs.name}\
                      \n Телефон: ${inputs.phone}\
                      \n E-mail: ${inputs.email}\
                      \n Cпособ связи: ${inputs.communication}\
                      ${inputs.communication === 'telegram' ? `\n Ник в Telegram: ${inputs.telegramUsername}` : ''}\
                      \n Комментарий: ${inputs.comment_client}
                      \n Состав заказа:\
                      \n ${items}`;
      
      // найстроки для WhatsApp
      const url = `https://api.green-api.com/waInstance${instanceId}/SendMessage/${token}`;
      const payload = {
        chatId: chatId,
        message: message,
        linkPreview: false,
      };

      const formattedPhone = inputs.phone.replace(/^\+/, ''); // Удаляем плюс в начале номера телефона

      const payloadClient = {
        chatId: `${formattedPhone}@c.us`,
        message: messageToClient,
        linkPreview: false,
      };
 
      // 1. Отправка сообщения в WhatsApp для АДМИНА
      await dispatch(fetchOrdersSendAdmin({ url, payload }));

      // 2. Отправка сообщения в WhatsApp для ПОЛЬЗОВАТЕЛЯ
      await dispatch(fetchOrdersSendClient({ url, payloadClient }));

      // 3. Отправляем уведомление на email
      const formData = {
        name: inputs.name,
        email: inputs.email,
        html: `
          <p>Здравствуйте, ${inputs.name},</p>
          <p>Мы получили ваш заказ и благодарим за ваш выбор. Мы скоро свяжемся с вами для уточнения деталей и подтверждения заказа.</p>
          
          <p><strong>Детали вашего заказа:</strong></p>
          <ul>
            <li><strong>Имя:</strong> ${inputs.name}</li>
            <li><strong>Телефон для связи:</strong> ${inputs.phone}</li>
            <li><strong>Email:</strong> ${inputs.email}</li>
            <li><strong>Способ связи:</strong> ${inputs.communication}</li>
            ${inputs.communication === 'telegram' ? `<li><strong>Ник в Telegram:</strong> ${inputs.telegramUsername}</li>` : ''}
            <li><strong>Комментарий к заказу:</strong> ${inputs.comment_client}</li>
          </ul>
          
          <p><strong>Состав вашего заказа:</strong></p>
          <ul>
            ${cartItems.map((item, index) => `<li>${index + 1}. ${item.name} - ${item.count} шт. * ${item.priceDiscount} ₸ = ${item.count * item.priceDiscount} ₸</li>`).join('')}
          </ul>
          
          <p><strong>Общая сумма заказа:</strong> ${sum} ₸</p>
          
          <p>С уважением,</p>
          <p>команда COFFEE BRO</p>
        `,
      };

      // // 4. Создаем в БД запись
      await dispatch(fetchOrdersEmail(formData));

      setIsSubmitting(false);
      // Показываем блок с сообщением
      setShowConfirmation(true);

      localStorage.removeItem('cart');

       // Через 3 секунды перенаправляем на начальную страницу
       setTimeout(() => {
        navigate('/');
       }, 3000);

        // 3. Добавление заказа в БД
      await dispatch(fetchOrdersAdd(orderData));

    } catch (error) {
      console.log('Ошибка при отправке заказа:', error);
    } 
    // finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div>
       
      {!showConfirmation ? (
        <form className={styles.form} onSubmit={submitHandler}>
            <h3 className={styles.h1}>Оформление заказа</h3>
          <div className={styles.formGroup}>
            <label className={styles.text} htmlFor="phone">Телефон <span className={styles.required}>*</span></label>
            <input className={styles.input} type="text" onChange={handlePhoneChange} name='phone' value={inputs.phone} required />
            <small>Мы свяжемся с вами, чтобы согласовать заказ</small>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.text} htmlFor="email">Email <span className={styles.required}>*</span></label>
            <input type="email" className={styles.input} onChange={changeHandler} name='email' value={inputs.email} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.text} htmlFor="communication">Как с вами связаться? <span className={styles.required}>*</span></label>
            <div className={styles.contactMethodGroup}>
              <label className={styles.contactMethodLabel}>
                <input
                  type="radio"
                  name="communication"
                  value="phone"
                  checked={inputs.communication === 'phone'}
                  onChange={changeHandler}
                />
                Телефон
              </label>
              <label className={styles.contactMethodLabel}>
                <input
                  type="radio"
                  name="communication"
                  value="whatsapp"
                  checked={inputs.communication === 'whatsapp'}
                  onChange={changeHandler}
                />
                WhatsApp
              </label>
              <label className={styles.contactMethodLabel}>
                <input
                  type="radio"
                  name="communication"
                  value="telegram"
                  checked={inputs.communication === 'telegram'}
                  onChange={changeHandler}
                />
                Telegram
              </label>
            </div>
          </div>
          {inputs.communication === 'telegram' && (
            <div className={styles.formGroup}>
              <label htmlFor="telegramUsername">Ник в Telegram <span className={styles.required}>*</span></label>
              <input type="text" onChange={changeHandler} name='telegramUsername' value={inputs.telegramUsername || ''} required />
            </div>
          )}
          <div className={styles.formGroup}>
            <label className={styles.text} htmlFor="name">Ваше имя или название компании <span className={styles.required}>*</span></label>
            <input type="text" className={styles.input} onChange={changeHandler} name='name' value={inputs.name} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.text} htmlFor="comment_client">Комментарий к заказу</label>
            <textarea name='comment_client' rows={4} onChange={changeHandler} value={inputs.comment_client} />
            <small>Например, адрес доставки</small>
          </div>
          <button className={styles.btn2} type="submit">Подтвердить заказ</button>
        </form> 
      ) : (
        <div className={styles.confirmationMessage}>
          <p className={styles.h1}>Спасибо за заказ! Мы скоро свяжемся с вами.</p>
        </div>
      )}
      {isSubmitting && (
        <div className={styles.overlay}>
          <div className={styles.loaderMessage}>Идет оформление заказа...</div>
        </div>
      )}
    </div>
  );
}
