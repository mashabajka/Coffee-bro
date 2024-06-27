import React, { useEffect } from "react";
import { NAME_COLUMNS_ORDER } from "../../constants";
import styles from "./Order_info.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar_admin/Navbar_admin";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOneOrder } from "../../redux/thunkActions_orders";
import CommentAdmin from "../../components/Comment_admin/Comment_admin";

export default function OrderInfoAdmin({ user }) {
  const order = useAppSelector((store) => store.ordersSlice.order);
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchOneOrder(id));
  }, []);


  if (!order?.id) {
    return <h1>Нет такого заказа</h1>;
  }

  return (
    <>
      <Navbar user={user} />
      <div>
        <div className={styles.comments}>
          <div className={styles.info}>
            <span>Номер заказа: {order.id}</span>
            <span>
              Дата заказа: {new Date(order.createdAt).toLocaleDateString()}
            </span>
            <span>Имя заказчика: {order.name}</span>
            <span>Телефон: {order.phone}</span>
            <span>Почта: {order.email}</span>
            <span>Способ связи: {order.communication}</span>
            <span>Комментарий к заказу: {order.comment_client}</span>
          </div>
          <div style={{marginBottom:'20px'}}>
            <CommentAdmin order={order} />
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              {NAME_COLUMNS_ORDER.map((name, i) => (
                <th key={i}>{Object.values(name)[0]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.productList.map((item, i) => (
              <tr key={i}>
                {NAME_COLUMNS_ORDER.map((name, j) => {
                  const columnKey = Object.keys(name)[0];

                  if (columnKey === "id") {
                    return <td key={j}>{i + 1}</td>;
                  }
                  if (columnKey === "sum") {
                    return <td key={j}>{item.count * item.price}</td>;
                  } else {
                    return <td key={j}>{item[Object.keys(name)[0]]}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Сумма заказа</td>
              <td>{order.sum}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
