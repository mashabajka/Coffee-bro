import { useState, useEffect, SetStateAction } from 'react';
import styles from './Timer.module.css';
import { Dispatch } from '@reduxjs/toolkit';
import { BasketItemType, ItemsType } from '../BasketItem/BasketItem';


  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function findAllSales() {
    let cart = JSON.parse(localStorage.getItem('cart'));
   const sales = cart.filter((el) => el.id > 11);
   const sum = [0, 0];
  for(let i =0; i < sales.length; i += 1) {
   sum[1] += sales[i].price * sales[i].quantity;
   sum[0] += sales[i].priceDiscount * sales[i].quantity;
  }
   return sum;
  }
  
  function findTrue() {
    let cart = JSON.parse(localStorage.getItem('cart'));
   const arr = cart.filter((el) => el.id === 1 || el.id === 2 || el.id === 3);
  if(arr.length > 1){
    return false;
  }
   return true;
  }

  export type TimerPropsType = {
    item: BasketItemType;
    setItems: Dispatch<SetStateAction<ItemsType>>;
    setTotal: Dispatch<SetStateAction<number>>;
  };

export default function Timer({ item, setItems, setTotal }:TimerPropsType): JSX.Element  {
    const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > -1) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => {
        if(seconds === 0) {


          if(item.id === 1 || item.id === 2 || item.id === 3 && findTrue()) {
            const sales = findAllSales();
              setTotal((prev) => prev - sales[0] + sales[1])
          } else{

            // if(item.discount) {
            //   setTotal((prev) => prev - (item.priceDiscount * item.quantity))
            // } else {
            //   setTotal((prev) => prev - (item.price * item.quantity))
            // }
          }
        
          removeFromCart(item.id)
          setItems((prev) => prev.filter((el) => el.id !== item.id));

        }
      clearInterval(countdown);
    };
  }, [seconds]);

  return (
    <div className={styles.timer}>
      <h3 className={styles.h1}>Товар удалится через</h3>
      <p>{seconds} с</p>
    </div>
  );
}