// import styles from './S1.module.css'
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import styles from './BasCounter.module.css';
import { BasketItemType, ItemsType } from '../BasketItem/BasketItem';
import { Dispatch } from '@reduxjs/toolkit';
import Timer from '../Timer/Timer';
import { SiUmbraco } from 'react-icons/si';

const priceDecorate = (num: number): string => {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

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


function findAllSales() {
  let cart = JSON.parse(localStorage.getItem('cart'));
 const sales = cart.filter((el) => el.id === 1 || el.id === 2 || el.id === 3);
 if(sales.length !== 0) {
  return true;
 }
 return false;
}


  export type ItemPropsType = {
    item: BasketItemType;
    setItems: Dispatch<SetStateAction<ItemsType>>;
    setTotal: Dispatch<SetStateAction<number>>;
    isSale: boolean;
  };


export function BasCounter({ item, setItems, setTotal, isSale}: ItemPropsType): JSX.Element {
  
let count = findCount(item.id);
const [sum, setSum] = useState(count)
const [refresh, setRefresh] = useState(false)
const priceAll = useMemo(() => priceDecorate(item.price*sum), [sum]);
const priceAllSale = useMemo(() => priceDecorate(item.priceDiscount*sum), [sum]);

const sale = findAllSales()


useEffect(() => {
  if(sale && item.id !== 9 && item.id !== 10 && item.id !== 11) {
    setTotal((prev) => prev + (item.priceDiscount * sum))
  } else {
    setTotal((prev) => prev + (item.price * sum))
  }
}, [ item ]);


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
     setSum((pr) => pr + 1);
    item.quantity += 1;

     if(item.discount) {
      setTotal((prev) => prev + item.priceDiscount)
     } else {
     setTotal((prev) => prev + item.price)
       
     }

  
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
    item.quantity -= 1;
   if(sum !== 0) {
    setSum((pr) => pr - 1 )
    if(sum > 0) {
      if(item.discount) {
        setTotal((prev) => prev - item.priceDiscount)
      } else {
        setTotal((prev) => prev - item.price)
      }
    }
    } 
    if(sum === 1 || sum === 0 ) {
      setRefresh(true)
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
    item.quantity += 1;

     setSum((prev) => prev + 1);
     setRefresh(false)
     if(item.discount) {
      setTotal((prev) => prev + item.priceDiscount)
     } else {
     setTotal((prev) => prev + item.price)
     }

  };

    return (
       <>
       {refresh ? (
<>
<Timer item={item} setItems={setItems} setTotal={setTotal}/>
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
      {item.discount ? (
<h2 className={styles.h1}>{priceAllSale} ₸ </h2>
      ):(
<h2 className={styles.h1}>{priceAll} ₸ </h2>
     )}
        
</>
       )}
  
       </>
    )
}

