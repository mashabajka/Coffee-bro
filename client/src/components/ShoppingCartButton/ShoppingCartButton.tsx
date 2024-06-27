import { Link } from 'react-router-dom';
import './ShoppingCartButton.css';


export type ShopPropsType = {
  num: number;
};

const ShoppingCartButton: React.FC< ShopPropsType> = ( {num} ) => {
  return (
     
    <Link to={'/basket'}>
       <button className="shopping-cart-button">
        <div className="icon-container">
        <img src= '../../src/assets/images/background/shopping-basket.png'  />
        </div>
        <span className="item-count">{num}</span>
      </button>
     </Link>
  );
};

export default ShoppingCartButton;

