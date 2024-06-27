import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchItems } from "../../redux/thunkActions";
import Item from "../../components/Item/Item";
import styles from "./Trade.module.css";
import NavbarBasket from "../../components/NavigateBasket/NavigateBasket";
import ItemSale from "../../components/ItemSale/ItemSale";
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton";
import ShoppingCartButton from "../../components/ShoppingCartButton/ShoppingCartButton";


function initializeCart() {
  console.log('>>> initialisation');
  if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
  }
}

function findAllcarts() {
  let cart = JSON.parse(localStorage.getItem('cart'));
  return cart
}

export default function Trade() {

  const items = useAppSelector((store) => store.orderSlice.items);
  const dispatch = useAppDispatch();

  const [num, setNum] = useState(0)

  useEffect(() => {
    void dispatch(fetchItems());
    initializeCart();
    const itemsAll = findAllcarts();
    itemsAll?.filter((el) => el.quantity !== 0);
   setNum(itemsAll?.length)
  }, []);

  const part1 = items.slice(0,3);
  const part2 = items.slice(3,6);
  const part3 = items.slice(6,8);
  const part4 = items.slice(8,11);
  const part5 = items.slice(11);

  return (
    <>
    <NavbarBasket />
    <ShoppingCartButton num={num} />
    <WhatsAppButton />

      <div className={styles.list}>
      
      <div className={styles.salewrap}>
<div className={styles.saleinner}>
<div className={styles.saleblock}>
<h3>При покупке кофе<span>скидка на сыпучие основы</span></h3>
</div>
</div>
</div>

     <h3 className={styles.name}>Кофе</h3>
        <div className={styles.part}>
        {part1.map((item) => (
          <Item key={item.id} item={item} setNum={setNum} />
        ))}
        </div>

        <hr className={styles.hr}/> 
        <h3 className={styles.name}>Расходники</h3>

        <div className={styles.part}>
        {part2.map((item) => (
          <Item key={item.id} item={item} setNum={setNum}/>
        ))}
        </div>

        <div className={styles.part1}>
        {part3.map((item) => (
          <Item key={item.id} item={item} setNum={setNum}/>
        ))}
        </div>

        <hr className={styles.hr} />
        <h3 className={styles.name}>Сыпучие основы</h3>

        <div className={styles.part}>
        {part4.map((item) => (
          <ItemSale key={item.id} item={item} setNum={setNum} />
        ))}
        </div>

        <div className={styles.part}>
        {part5.map((item) => (
          <ItemSale key={item.id} item={item} setNum={setNum}/>
        ))}
        </div>

      </div>
    </>
  );
}
