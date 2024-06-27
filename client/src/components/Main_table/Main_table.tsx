import React, { useEffect, useState } from "react";
import { NAME_COLUMNS } from "../../constants";
import styles from "./Main_table.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCheckStatus,
  fetchCheckStatus_Collect,
} from "../../redux/thunkActions_orders";
import { changeStatus, changeStatusCollect } from "../../redux/ordersSlice";
import SearchAdmin from "../Search_admin/Search_admin";
import {OrdersArrType} from '../../types'
import { useSelector } from "react-redux";

function Input({ handleChange, order, disabled, id, handleCheck }) {
  const [checked, setChecked] = useState(order);

  return (
    <input
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onChange={() => {
        setChecked((curr) => !curr);
        handleCheck && handleCheck(id);
        return handleChange(id);
      }}
    />
  );
}

export default function MainTable({ orders}) {
  const checked = useAppSelector((store) => store.ordersSlice.checked);
  const { adminSearchInput } = useSelector((state) => state.ordersSlice);  
  const { filteredOrders } = useSelector((state) => state.ordersSlice);

  const [listOfOrders, setListOfOrders] = useState(orders);

  const dispatch = useAppDispatch();


  const handleChange = (id: number) => {
    void dispatch(fetchCheckStatus(id));
  };

  const handleCheck = (id: number) => {
    setListOfOrders((curr) =>
      curr.map((el) =>
        el.id === id ? { ...el, status_collect: !el.status_collect } : el
      )
    );

    void dispatch(changeStatus(id));
  };

  const handleChecCollectStatus = (id: number) => {
    setListOfOrders((curr) =>
      curr.map((el) => (el.id === id ? { ...el, status: !el.status } : el))
    );
    void dispatch(changeStatusCollect(id));
  };

  const handleChangeStatus = (id: number) => {
    void dispatch(fetchCheckStatus_Collect(id));
  };
  return (
    <>
      <SearchAdmin orders={orders} setOrders={setListOfOrders} />

      <table className={styles.table}>
        <thead>
          <tr>
            {NAME_COLUMNS.map((name, i) => (
              <th key={i}>{Object.values(name)[0]}</th>
            ))}
          </tr>
        </thead>
        <tbody>

{!adminSearchInput.search.lengtn ? 

          listOfOrders.map((order) => {
            let rowColor = "#b1e3b2";
            if (!order.status && !order.status_collect) {
              rowColor = "LightPink	";
            }
            if (!order.status && order.status_collect) {
              rowColor = "BlanchedAlmond";
            }

            return (
              <tr key={order.id} style={{ backgroundColor: rowColor }}>
                {NAME_COLUMNS.map((column, i) => {
                  const columnKey = Object.keys(column)[0];
                  if (columnKey === "createdAt") {
                    return (
                      <td key={i}>
                        {new Date(order[columnKey]).toLocaleDateString()}
                      </td>
                    );
                  }
                  if (columnKey === "link") {
                    return (
                      <td key={i}>
                        {
                          <Link to={`/admin/${order.id}`}>
                            <button className={styles.InfoBtn}>INFO</button>
                          </Link>
                        }
                      </td>
                    );
                  }
                  if (columnKey === "status") {
                    return (
                      <td key={i}>
                        <Input
                          handleChange={handleChange}
                          order={order.status}
                          id={order.id}
                          disabled={!order.status_collect}
                          handleCheck={handleChecCollectStatus}
                        />
                      </td>
                    );
                  }
                  if (columnKey === "status_collect") {
                    return (
                      <td key={i}>
                        <Input
                          handleChange={handleChangeStatus}
                          order={order.status_collect}
                          id={order.id}
                          handleCheck={handleCheck}
                          disabled={order.status}
                        />
                      </td>
                    );
                  } else {
                    return <td key={i}>{order[columnKey]}</td>;
                  }
                })}
              </tr>
            );
            
          }) : 
          filteredOrders.map((order) => {
            console.log('tttt');
            let rowColor = "#b1e3b2";
            if (!order.status && !order.status_collect) {
              rowColor = "LightPink	";
            }
            if (!order.status && order.status_collect) {
              rowColor = "BlanchedAlmond";
            }

            return (
              <tr key={order.id} style={{ backgroundColor: rowColor }}>
                {NAME_COLUMNS.map((column, i) => {
                  const columnKey = Object.keys(column)[0];
                  if (columnKey === "createdAt") {
                    return (
                      <td key={i}>
                        {new Date(order[columnKey]).toLocaleDateString()}
                      </td>
                    );
                  }
                  if (columnKey === "link") {
                    return (
                      <td key={i}>
                        {
                          <Link to={`/admin/${order.id}`}>
                            <button className={styles.InfoBtn}>INFO</button>
                          </Link>
                        }
                      </td>
                    );
                  }
                  if (columnKey === "status") {
                    return (
                      <td key={i}>
                        <Input
                          handleChange={handleChange}
                          order={order.status}
                          id={order.id}
                          disabled={!order.status_collect}
                          handleCheck={handleChecCollectStatus}
                        />
                      </td>
                    );
                  }
                  if (columnKey === "status_collect") {
                    return (
                      <td key={i}>
                        <Input
                          handleChange={handleChangeStatus}
                          order={order.status_collect}
                          id={order.id}
                          handleCheck={handleCheck}
                          disabled={order.status}
                        />
                      </td>
                    );
                  } else {
                    return <td key={i}>{order[columnKey]}</td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
