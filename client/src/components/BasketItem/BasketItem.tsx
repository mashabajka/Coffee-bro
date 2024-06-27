import { SetStateAction, useEffect, useMemo, useState } from "react";
import styles from './BasketItem.module.css';
import { Dispatch } from "@reduxjs/toolkit";
import { BasCounter } from "../BasCounter/BasCounter";
import { FaSalesforce } from "react-icons/fa6";
import Timer from "../Timer/Timer";



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


function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart'));

  cart = cart.filter((item )=> item.id !== id);

  localStorage.setItem('cart', JSON.stringify(cart));
}

function priceCart(id, sale) {
  let cart = JSON.parse(localStorage.getItem('cart'));

  const index = cart.findIndex((item) => item.id === id);
  if(index !== -1) {
    cart[index].discount = sale;

    localStorage.setItem('cart', JSON.stringify(cart));
  }
}


export type BasketItemType = {
  id: number;
  name: string;
  text: string; 
  url: string;
  price: number;
  priceDiscount: number;
  discount: boolean;
  quantity: number;
};

export type ItemsType = Array<BasketItemType>;

export type ItemPropsType = {
    item: BasketItemType;
    setItems: Dispatch<SetStateAction<ItemsType>>;
    setTotal: Dispatch<SetStateAction<number>>;
    isSale: boolean;
  };

export default function BasketItem({ item, setItems, setTotal, isSale }: ItemPropsType): JSX.Element {

  const price = useMemo(() => priceDecorate(item.price), []);
  const priceDiscount = useMemo(() => priceDecorate(item.priceDiscount), []); 
  const size = useMemo(() => sizeT(item.price), []);
const [refresh, setRefresh] = useState(false)


const deleteHandler = () => {
  if(item.discount && item.id !== 9 && item.id !== 10 && item.id !== 11) {
    setTotal((prev) => prev - (item.priceDiscount * item.quantity))
  } else {
    setTotal((prev) => prev - (item.price * item.quantity))
  }
  setRefresh(true)
};

const deleteNowHandler = () => {
  if(item.id === 1 || item.id === 2 || item.id === 3 && findTrue()) {
    const sales = findAllSales();
      setTotal((prev) => prev - sales[0] + sales[1])
  }
  removeFromCart(item.id)
  setItems((prev) => prev.filter((el) => el.id !== item.id));
  
};

  useEffect(() => {
    if(isSale && item.id > 11) {
      priceCart(item.id, true)
      setItems((prev) => {
        const index = prev.findIndex((el) => el.id === item.id);
        prev[index].discount = true;
        return prev
      });
    } else {
    priceCart(item.id, false) 
      setItems((prev) => {
        const index = prev.findIndex((el) => el.id === item.id);
        prev[index].discount = false;
        return prev
      });
    }
  }, [isSale]);

  const openDeleteHandler = () => {
     setRefresh(false)
  };
 

    return (
      <div className={styles.Onecard}>
        <div className={styles.card}>
        <img src={item.url} className={styles.img} alt="карточка товара"/>
          <h1 className={styles.h1}>{item.name}</h1>

          {size ? (
            <>
          
          {item.discount ? (
            <>
          <p className={styles.sum}><s>{price}</s> ₸ /кор</p>
            <p className={styles.sale}>{priceDiscount} ₸ /кор</p>
            </>
         ):(
          <>
          <p className={styles.sum}>{price} ₸ /кор</p>
          </>
         )}
        
          </>

          ) : (
            <>
              {item.discount ? (
            <>
            <p className={styles.sum}><s>{price}</s> ₸ /шт</p> 
            <p className={styles.sale}>{priceDiscount} ₸ /шт</p> 
            </>
         ):(
          <>
          <p className={styles.sum}>{price} ₸ /шт</p> 
          </>
         )}
             
             </>
          )}

{refresh ? (
<>
<Timer item={item} setItems={setItems} setTotal={setTotal}/>
<button type="button" className={styles.btn1} onClick={openDeleteHandler}>Отмена</button>

<button type="button" className={styles.btn} onClick={deleteNowHandler}>
  <img src="/icon_item/delete.png" className={styles.delete} alt="Кнопка удалить" />
      </button>
</>
):(
  <>
   <BasCounter item={item} setItems={setItems} setTotal={setTotal} isSale={isSale}/>
  <button type="button" className={styles.btn} onClick={deleteHandler}>
  <img src="/icon_item/delete.png" className={styles.delete} alt="Кнопка удалить" />
      </button>
      </>
)}
             
          
        </div>
        <hr className={styles.hr}/>
        </div>
    )
  }
  