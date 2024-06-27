import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Search_admin.module.css";
import { OrdersArrType } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import { setAdminSearchInput, setfilteredOrders } from "../../redux/ordersSlice";
import { useSelector } from "react-redux";

const filterOrders = (searchText: string, listOfOrders: OrdersArrType) => {
  if (!searchText) {
    return listOfOrders;
  }
  return listOfOrders.filter(({ phone }) => phone.includes(searchText));
};

export default function SearchAdmin({ orders, setOrders }) {
  const { adminSearchInput } = useSelector((state) => state.ordersSlice);
   
  const [input, setInput] = useState(adminSearchInput);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const Debounse = setTimeout(() => {
      const filteredOrders = filterOrders(input.search, orders);
      setOrders(filteredOrders);
    void dispatch(setfilteredOrders(filteredOrders));

    }, 300);
    return () => clearTimeout(Debounse);
  }, [input.search]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    void dispatch(setAdminSearchInput(input));
  }, [input]);

  return (
    <>
      <div className={styles.search}>
        <input
          onChange={changeHandler}
          value={input.search}
          placeholder="Поиск по номеру телефона"
          name="search"
          type="text"
          className="form-control"
          id="searchInput"
        />
      </div>
    </>
  );
}
