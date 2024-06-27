import { Link } from "react-router-dom";
import styles from "./Navbar_admin.module.css";
import clsx from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { fetchLogOut, fetchLogin } from "../../redux/thunkActions_login";

export default function Navbar({ user }) {
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useAppDispatch();

  const loginHandler = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const resultAction = await dispatch(fetchLogin(input));
      if (fetchLogin.fulfilled.match(resultAction)) {
        if (resultAction.payload.logErr) {
          setErrMsg(resultAction.payload.logErr);
          //   setTimeout(() => {
          //     navigate("/registration");
          //     closeModal();
          //     setErrMsg("");
          //   }, 1500);
        }
        if (resultAction.payload.passErr) {
          setErrMsg(resultAction.payload.passErr);
        }
        if (resultAction.payload.logDone) {
          closeModal();
        }
      }
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  const logoutHandler = async () => {
    try {
      await dispatch(fetchLogOut());
    } catch (error) {
      console.error("Ошибка при выходе из системы", error);
    }
  };

  return (
    <div className={clsx(styles.wrapper, styles.color)}>
      {!user?.length && (
        <button onClick={loginHandler} className={styles.logBtn}>
          Login
        </button>
      )}
      {!!user?.length && (
        <>
        <p className={styles.welcome}>Добро пожаловать</p>
        {
                        <Link to={'/admin'}>
                          <button className={styles.homeBtn}>Заказы</button>
                        </Link>
                      }
        <button onClick={logoutHandler} className={styles.logBtn}>
          Logout
        </button>
        </>
      )}
      {isModalOpen && (
        <dialog open className={styles.modal} style={{ padding: '0', borderRadius: '10px' }}>
          <div id="modal-box" style={{ padding: "1rem" }}>
            <form className="logForm" onSubmit={handleFormSubmit}>
              <button
                type="button"
                id="close-modal-btn"
                className="btn-close"
                aria-label="Закрыть"
                style={{
                  float: "right",
                  border: "0px",
                  backgroundColor: "white",
                }}
                onClick={closeModal}
              ></button>
              {!!errMsg.length && <h4 className={styles.errMsg}>{errMsg}</h4>}

              <div className="mb-30">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Ваш email
                </label>
                <input
                  onChange={changeHandler}
                  value={input.email}
                  name="email"
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                />
              </div>
              <div className="mb-30">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Ваш пароль
                </label>
                <input
                  onChange={changeHandler}
                  value={input.password}
                  name="password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <br/>
              <button type="submit" className="btn btn-outline-dark">
                Отправить
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
