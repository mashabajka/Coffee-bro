import styles from "./Background.module.css";
import { TPropsBackground } from "../../types";

const Background: React.FC<TPropsBackground> = ({ children, img }) =>{

  return (
    <>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        {children}
      </div>
    </>
  );
}

export default Background;