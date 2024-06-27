import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  fetchDelete,
  fetchEditComment,
  fetchPostComment,
} from "../../redux/thunkActions_comment_admin";

export default function CommentAdmin({ order}) {
  const [input, setInput] = useState({ comment: "", update: "" });
  const [isShowInput, setIsShowInput] = useState(false);

  const dispatch = useAppDispatch();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateHendler = async () => {
    setIsShowInput(!isShowInput);
  };

  const submitHandler = async (e): Promise<void> => {
    e.preventDefault();
    void dispatch(fetchPostComment({ input: input.comment, id: order.id }));
    setInput((curr) => ({ ...curr, comment: "" }));
  };

  const changeCommentHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitChangeHandler = async (): Promise<void> => {
    void dispatch(fetchEditComment({ input: input.update, id: order.id }));
    setInput((curr) => ({ ...curr, update: "" }));

    setIsShowInput(false);
  };

  const deleteHandler = async (): Promise<void> => {
    void dispatch(fetchDelete(order.id));
    // setComment('')
  };

  return (
    <>
      <span>Комментарий администратора:</span>
      <div>{order.comment_admin}</div>
      <form style={{marginTop:'15px'}}>
        {!order.comment_admin && (
          <>
            <div className="mb-30">
              <textarea
                onChange={(e) => changeHandler(e)}
                value={input.comment}
                name="comment"
                className="form-control"
                id="exampleInputEmail1"
              />
            </div>
            <button
            style={{marginTop:'15px'}}
              type="submit"
              onClick={(e) => submitHandler(e)}
              className="btn btn-outline-dark"
            >
              Отправить
            </button>
          </>
        )}
        {!!order.comment_admin && (
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={updateHendler}
          >
            Изменить
          </button>
        )}
        {!!order.comment_admin && (
          <button
            type="button"
            onClick={deleteHandler}
            className="btn btn-outline-dark"
          >
            Удалить
          </button>
        )}
      </form>
        {isShowInput && (
          <form action="">
            <textarea style={{marginTop:'20px'}} name="update" className='form-control' onChange={(e) => changeCommentHandler(e)} />{" "}
            <button
            style={{marginTop:'15px'}}
              type="button"
              className="btn btn-outline-dark"
              onClick={() => submitChangeHandler()}
            >
              Сохранить
            </button>
          </form>
        )}
    </>
  );
}
