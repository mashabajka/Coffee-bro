import React, { useEffect, useLayoutEffect } from "react";
import Navbar from "../../components/Navbar_admin/Navbar_admin";
import MainTable from "../../components/Main_table/Main_table";
import styles from "./Admin.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllOrders } from "../../redux/thunkActions_orders";
import SearchAdmin from "../../components/Search_admin/Search_admin";
import MainTable_copy from "../../components/Main_table/Main_table copy";

export function Admin({ user }) {
  const orders = useAppSelector((store) => store.ordersSlice.orders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchAllOrders());
  }, []);

  return (
    <>
      {!user?.length && <Navbar user={user} />}
      {!!user?.length && (
        <>
          <Navbar user={user} />
          {/* <img src='/icons_s2/coffee.png'/> */}
          <h2 className={styles.header}>Таблица заказов</h2>
          {!!orders.length ? (
            <MainTable orders={orders} />
          ) : (
            <div className="d-flex justify-content-center" style={{marginTop:'40px'}}>
              <div className="spinner-border" role="status">
            
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
