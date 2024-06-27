import { SetStateAction, useEffect, useMemo, useState } from "react";
import styles from './itemSale.module.css';
import { ItemType } from "../../redux/orderSlice";
import { Counter } from "../Counter/Counter";
import { CounterTrade } from "../CounterTrade/CounterTrade";
import { Dispatch } from "@reduxjs/toolkit";



function addToCart({ id, name, text, url, price, priceDiscount, discount, quantity }) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
      cart[index].quantity += quantity;
  } else {
      cart.push({ id, name, text, url, price, priceDiscount, discount, quantity  });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}


function findCount(id) {
  let cart = JSON.parse(localStorage.getItem('cart'));

  const index = cart.findIndex(item => item.id === id);

if(cart[index]?.quantity !== 0) {
  return cart[index]?.quantity
}
return 0
}

const priceDecorate = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const sizeT = (num: number): boolean => {
  if(num >= 3500 && num <= 4000) {
    return false;
  } else {
    return true;
  }
};

export type ItemPropsType = {
    item: ItemType;
    setNum: Dispatch<SetStateAction<number>>;
  };

  const isSale = true;

export default function ItemSale({ item, setNum }: ItemPropsType): JSX.Element {

  const price = useMemo(() => priceDecorate(item.price), []);
  const priceDiscount = useMemo(() => priceDecorate(item.priceDiscount), []); 
  const size = useMemo(() => sizeT(item.price), []);

  const [isModalOpen, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false)
  let count = findCount(item.id);
  const [sum, setSum] = useState(count);

  const openModalHandler = () => {
    const itemAdd = {
      id: item.id,
      name: item.name,
      text: item.text,
      url: item.url,
      price: item.price,
      priceDiscount: item.priceDiscount,
      discount: item.discount,
      quantity: 1,
    };
     addToCart(itemAdd);
     setModal(true)
     setRefresh(false)
     setNum((prev) => prev + 1);
  };

  const closeModalHandler = () => {
    setRefresh(true)
    setModal(false)
    
  };

  useEffect(() => {
    setSum(() => findCount(item.id))
  }, [refresh, sum]);


    return (
        <div className={styles.card}>
        <img src={item.url} className={styles.img} alt="карточка товара"/>
          <h1 className={styles.h1}>{item.name}</h1>

          {size ? (
            <>
          <div className={styles.sale}>
                <s className={styles.sum1}>{priceDiscount} </s> 
                <p className={styles.sum}> {price} ₸</p>
                <p className={styles.sum3}> /кор</p> 

              </div>
              </>
          ) : (
            <>
            <div className={styles.sale1}>
            <p className={styles.sum1}> {price} ₸ /шт</p>
            <div className={styles.priceSale}>
              <p className={styles.sum6}>{priceDiscount} ₸ /шт </p>
                <p className={styles.sum5}> (при покупке кофе)</p>
                </div>
      
            </div> 
            </>
          )}

          {sum ? (
                <CounterTrade item={item}  setNum={setNum} isSale={isSale}/>
               ) : (
              <button type="button" className={styles.btn} onClick={openModalHandler}>Добавить</button>
             )}

         {isModalOpen &&( 
            <dialog open style={{ padding: '0', borderRadius: '10px' }}>
              <div className={styles.wrap}>
                <div className={styles.modal} style={{ padding: '1rem' }}>
        
          <img src={item.url}  className={styles.img1} alt="карточка товара"/>
          <h1 className={styles.h4}>{item.name}</h1>
          <h2 className={styles.h5}>{item.text}</h2>


          {size ? (
            <>
           <div className={styles.sale}>
                <s className={styles.sum1}>{priceDiscount} ₸ </s>
                <p className={styles.sum}> {price} ₸</p>
                  <p className={styles.sum3}> /кор</p> 
                 
              </div>
              <Counter item={item}  setNum={setNum}/>
              </>
          ) : (
            <>
            <div className={styles.sale}>  
            
            <p className={styles.sum1}> {price} ₸</p>
              <p className={styles.sum3}> /шт</p>
              <p className={styles.sum}>{priceDiscount} ₸ </p>
              <p className={styles.sum}> /шт</p>
            </div>
            <Counter item={item}  setNum={setNum}/>
            </>
          )}
          
          <button type="button" onClick={closeModalHandler} className={styles.modalClose} >  
          <img src="/icon_item/x.png" alt="Кнопка «button»" />
          </button> 
   
          </div>
          </div>
          </dialog>
        )}
        </div>
    )
  }
  