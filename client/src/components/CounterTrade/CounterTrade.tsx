// import styles from './S1.module.css'
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { ItemType } from '../../redux/orderSlice';
import styles from './counterTrade.module.css';
import { Dispatch } from '@reduxjs/toolkit';
import { Counter } from '../Counter/Counter';

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

export  type itemPropsType = {
    item: ItemType;
    setNum: Dispatch<SetStateAction<number>>;
    isSale: boolean;
  };



export function CounterTrade({ item, setNum, isSale }: itemPropsType) {
  

  const price = useMemo(() => priceDecorate(item.price), []);
  const priceDiscount = useMemo(() => priceDecorate(item.priceDiscount), []); 
  const size = useMemo(() => sizeT(item.price), []);

const [refresh, setRefresh] = useState(false)
const [isModalOpen, setModal] = useState(false);
let count = findCount(item.id);
const [sum, setSum] = useState(count)


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
     setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false) 
    setSum(() => findCount(item.id))
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

{isModalOpen &&( 
            <dialog open style={{ padding: '0', borderRadius: '10px' }}>
              <div className={styles.wrap}>
                <div className={styles.modal} style={{ padding: '1rem' }}>
        
          <img src={item.url}  className={styles.img1} alt="карточка товара"/>
          <h1 className={styles.h4}>{item.name}</h1>
          <h2 className={styles.h5}>{item.text}</h2>


          {size ? (
            <>
            {isSale ? (
              <>
               <div className={styles.sale}>

                <s className={styles.sum1}>{priceDiscount} </s>
                <p className={styles.sum2}> {price} ₸</p>
                  <p className={styles.sum3}> /кор</p> 
                 
                
              </div>
   <Counter item={item} setNum={setNum}/>
   </>
            ):(
              <>
              <p className={styles.sum}>{price} ₸ /кор</p> 
              <Counter item={item} setNum={setNum}/>
              </>
            )}
           
              </>
          ) : (
            <>
            {isSale ? (
    <>  
         <div className={styles.sale}>  
            
            <p className={styles.sum1}> {price} ₸</p>
              <p className={styles.sum3}> /шт</p>
              <p className={styles.sum2}>{priceDiscount} </p>
              <p className={styles.sum3}> /шт</p>
               
            </div>
            <Counter item={item} setNum={setNum}/>

    </>
            ):(
            <>  
            <p className={styles.sum}>{price} ₸ /шт</p>
            <Counter item={item} setNum={setNum}/>
            </>
            )}
            </>
            
          )}
          
          <button type="button" onClick={closeModalHandler} className={styles.modalClose} >  
          <img src="/icon_item/x.png" alt="Кнопка «button»" />
          </button> 
   
          </div>
          </div>
          </dialog>
        )}
  
       </>
    )
}