import styles from './slide3.module.css';
import clsx from 'clsx';

import { useState, ChangeEvent, useMemo } from "react";
import Background from '../Background/Background';
import Wrapper from '../Wrapper/Wrapper';

export default function Slide3(): JSX.Element {
  const [inputs, setInputs] = useState({ count: 10, rent: '', price: '', num: 1});


  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const summ = (num1: {count: number, price: string, num: number, rent: string}): string => {
    const sum = (num1?.count * Number(num1?.price) * num1?.num) * 30 * 0.5 - Number(num1?.rent)
    const res = Math.round(sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return res
  };

  const summAll = (num1: {count: number, price: string, num: number, rent: string}): string => {
    const sum = (num1?.count * Number(num1?.price) * num1?.num) * 30 
    const res = Math.round(sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return res
  };
  const all = useMemo(() => summAll(inputs), [inputs]);
  const result = useMemo(() => summ(inputs), [inputs]);

  return (
    <Background>
    <Wrapper>
    <div className={styles.wrapper_content}>

    <div className={clsx(styles.divContainer)}>

      <h1 className={clsx(styles.h)}>
        РАССЧИТАЙ СВОЮ ПРИБЫЛЬ
      </h1>

      <div className={clsx(styles.dd)}>

        <div className={clsx(styles.count)}>
          
    <div className={clsx(styles.range_box)}>
      <label className={clsx(styles.label)} >Количество напитков в день
        
        </label>
      <input type="range" defaultValue="1" value={inputs.count} className={clsx(styles.range)} onChange={changeHandler} name="count" min="10" max="100" step="1" />
      <span className={clsx(styles.rangeValue)}>{inputs.count}</span>
   </div>

   <div className={clsx(styles.range_box)}>
   <label className={clsx(styles.label)}>Средняя цена за напиток
    </label>
   <input id="number" className={clsx(styles.input)} name="price" type="number" value={inputs.price} onChange={changeHandler} />
   <p className={clsx(styles.p)}>₸</p>
   </div>

   <div className={clsx(styles.range_box)}>
   <label className={clsx(styles.label)}>Стоимость аренды</label>
   <input id="number" className={clsx(styles.input)} name="rent" type="number" value={inputs.rent} onChange={changeHandler} />
   <p className={clsx(styles.p)}>₸</p>
   </div>


   <div className={clsx(styles.range_box)}>
      <label className={clsx(styles.label)} >Количество стоек</label>
      <input type="range" defaultValue="1" value={inputs.num} className={clsx(styles.range)} onChange={changeHandler} name="num" min="1" max="50" step="1" />
      <span className={clsx(styles.rangeValue)}>{inputs.num}</span>
   </div>

   </div>

   <div className={clsx(styles.sum)}>
   <div className={clsx(styles.cl)}>Общая выручка: <br/>{all} ₸</div>
   <div className={clsx(styles.clean)}>Чистая прибыль: <br/>{result} ₸</div>
   </div>

   </div>
</div>
   </div>
  </Wrapper>

  </Background>
  );
}