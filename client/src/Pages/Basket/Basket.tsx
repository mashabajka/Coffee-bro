import { useEffect, useMemo, useState } from "react";
import NavbarBasket from "../../components/NavigateBasket/NavigateBasket";
import styles from "./basket.module.css";
import BasketItem from "../../components/BasketItem/BasketItem";
import { Link } from "react-router-dom";


function initializeCart() {
  console.log('>>> initialisation');
  if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
  }
}

function findAllcarts() {
  initializeCart();
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart.length !== 0) {
      return cart
    }
    return []
    
  }
  
const priceDecorate = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

function priceAllCart() {
  let cart1 = JSON.parse(localStorage.getItem('cart'));
  if(cart1.length !== 0) {
    const cart = cart1.map((el) => {
      el.discount = false
      return el
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }

 
}


export default function Basket() {

    useEffect(() => {
          initializeCart();
      }, []);

 const itemsAll = findAllcarts();
 if(itemsAll.length !== 0) {
  itemsAll.filter((el) => el.quantity !== 0);
 }
 
 const [items, setItems] = useState(itemsAll);
 const [total, setTotal] = useState(0);
 const [isDelivery, setDelivery] = useState(true);
 const [deliveryFree, setDeliveryFree] = useState(true);
 const [isSale, setSale] = useState(false);

useEffect(() => {

  if(total > 100000) {
    setDeliveryFree(false)
  } else {
    setDeliveryFree(true)
  }

}, [total]);

useEffect(() => {
  if(total < 50000) {
    setDelivery(true)
  } else {
    setDelivery(false)
  }

}, [total]);

useEffect(() => {
  const cards = findAllcarts();
  const res = cards.filter((el) => el.id === 1 || el.id === 2 || el.id === 3);
  if(res.length) {
    setSale(true)
  } else {
    setSale(false)
    priceAllCart()
    setItems((prev) => prev.map((el) => {
      el.discount = false
      return el
    }));
  }
}, [ total ]);

const totalMin = useMemo(() => priceDecorate(50000-total), [total]);
const totalFree = useMemo(() => priceDecorate(100000-total), [total]);
const totalAll = useMemo(() => priceDecorate(total), [total, items]);

const a ='<<'

return(

    < >
    <NavbarBasket />

      <h1 className={styles.name}>Товары</h1>
      <hr />
       {items.length ? (
        <>
      {isDelivery && (
              <h2 className={styles.h3}>До минимального заказа: {totalMin} / 50 000 ₸</h2>
  )}

         <div className={styles.list}>
 {items.map((item) => (
    <BasketItem key={item.id} item={item} setItems={setItems} setTotal={setTotal} isSale={isSale}/>
  ))}
  
{deliveryFree && (
  <div className={styles.delivery}>
    <h2 className={styles.h1}>До бесплатной доставки: {totalFree} / 100 000 ₸</h2>
    <div className={styles.h}>
      <img src="/icon_item/delivery.png" className={styles.img1} alt="корзина" />
    </div>
    
    </div>
  )}

    <h2 className={styles.h2}>Сумма заказа: {totalAll} ₸</h2>
    {!isDelivery && (
      <Link to={'/confirm'}>
    <button type="button" className={styles.btn2}>Заказать</button>
      </Link>
  )}
     </div>
  </>
       ):(
<>
{isDelivery && (
              <h2 className={styles.h3}>Минимальный заказ: 50 000 ₸</h2>
  )}
<h2>Корзина пуста</h2>
  <img src="/icon_item/basket3.png" className={styles.img} alt="корзина" />

  <Link to={'/trade'}>
        <button className={styles.btn}> {a}  Вернуться в Торговый Дом</button>
      </Link>
</>
       )}
 
    </>
);
}