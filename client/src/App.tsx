import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Admin } from "./Pages/Admin/Admin.tsx";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { fetchGetLogin } from "./redux/thunkActions_login";
import OrderInfoAdmin from "./Pages/Order_info/Order_info.tsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { loadScript } from "./redux/thunkLoadScript";
import NotFoundPage from "./Pages/Error/Error.tsx";
import Trade from "./Pages/Trade/Trade.tsx";
import Home from "./Pages/Home.tsx";
import Basket from "./Pages/Basket/Basket.tsx";
import Order from "./Pages/Order/Order.tsx";

function App() {
  const { user, status } = useSelector((state) => state.logSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetLogin());
    dispatch(loadScript("/js/cartLocalStorage.js"));
  }, []);

  if (status === "loading" || status === "idle") {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "40px" }}
      >
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <div className="main_wrapper" style={{ scrollBehavior: "smooth" }}>
      <Routes>
        <Route
          path="admin/:id"
          element={
            <PrivateRoute user={user}>
              <OrderInfoAdmin user={user} />
            </PrivateRoute>
          }
        />
        <Route path="admin" element={<Admin user={user} />} />
        <Route index element={<Home />} />

          <Route
            path="trade"
            element={
              <>
                <Trade />
              </>
            }
          />
          <Route path="confirm" element={<Order />} />
          <Route path="error" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="basket" element={<Basket />} />
        </Routes>
      </div>
  );
}

export default App;
