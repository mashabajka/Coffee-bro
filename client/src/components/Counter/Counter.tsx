// import styles from './S1.module.css'
import { SetStateAction, useEffect, useState } from 'react';
import { ItemType } from '../../redux/orderSlice';
import styles from './counter.module.css';
import { Dispatch } from '@reduxjs/toolkit';

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

function minusCart({id, name, text, url, price, priceDiscount, discount, quantity }) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  
  const index = cart.findIndex(item => item.id === id);

  if (index > -1) {
    if(cart[index].quantity !== 0) {
      cart[index].quantity -= quantity;
    }
 
  } else {
      cart.push({ id, name, text, url, price, priceDiscount, discount, quantity });
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

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart'));

  cart = cart.filter(item => item.id !== id);

  localStorage.setItem('cart', JSON.stringify(cart));
}

export  type itemPropsType = {
    item: ItemType;
    setNum: Dispatch<SetStateAction<number>>;
  };


export function Counter({ item, setNum }: itemPropsType) {
  
let count = findCount(item.id);
const [sum, setSum] = useState(count)
const [refresh, setRefresh] = useState(false)

  const handleAddToCart = () => {
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
     setSum((prev) => prev + 1);
  
  };

  const handleMinusFromCart = () => {
    const itemDel = {
      id: item.id,
      name: item.name,
      text: item.text,
      url: item.url,
      price: item.price,
      priceDiscount: item.priceDiscount,
      discount: item.discount,
      quantity: 1,
    };
    minusCart(itemDel);

   if(sum !== 0) {
    setSum((prev) => prev - 1 )
    } 
    if(sum === 1 || sum === 0 ) {
      setNum((prev) => prev - 1);
      removeFromCart(item.id)
      setRefresh(true);
    }
  };

  const openCountHandler = () => {
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
     setSum((prev) => prev + 1);
     setNum((prev) => prev + 1);
     setRefresh(false)
  };

  useEffect(() => {
    setSum(() => findCount(item.id))
  }, [refresh, sum]);


    return (
       <>
       {refresh ? (
<>
<button type="button" className={styles.btn1} onClick={openCountHandler}>Добавить</button>
</>
       ) : (
<>
<div className={styles.main}>
        <button className={styles.btn} onClick={handleMinusFromCart} >
          -
        </button>
        <div className={styles.num}>
            { sum }
        </div>
        <button className={styles.btn} onClick={handleAddToCart} >
          +
        </button>
      </div>
</>
       )}
  
       </>
    )
}
