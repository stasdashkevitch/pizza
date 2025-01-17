import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { selectPizzas } from "../../redux/slices/PizzaSlice";

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) { // Пропсы это объекты передаваемые компонентами - PizzaBlock({titel: "dd", price: 400})
  // мы можем использовать деструктуризацию
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(0);
  // const onClickAdd = () => {
  //   // вторая функция из useState обновляет значение
  //   setPizzaCount(pizzaCount + 1);
  //   // каждый раз происходит перерендер, но virtualDom не позволяет перерисовывать все в обычном DOM(благодаря алогритму сравнения)
  //   // используем данный хук тогда когда меняем переменную
  // };

  const typeNames = ['тонкое', 'традиционное'];
  // если у нас до этого был импорт с названием PizzaBlock и мы этоот компонент переместили в папку PizzaBlock, то достаточно просто переименовать название фалйа компонента в index.jsx
  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: activeSize
    };
    dispatch(addItem(item));
  };
  const cartItem = useSelector(selectPizzas(id));
  const addedCount = cartItem ? cartItem.count : 0;
  const dispatch = useDispatch();
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img
          className="pizza-block__image"
          src={imageUrl} alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {
              types.map((typeIndex) => (
                <li key={typeIndex} onClick={() => setActiveType(typeIndex)} className={activeType === typeIndex ? 'active' : ''}>{typeNames[typeIndex]}</li>
              ))
            }
          </ul>
          <ul>
            {
              sizes.map((value, sizeIndex) => (
                <li key={sizeIndex} onClick={() => setActiveSize(sizeIndex)} className={activeSize === sizeIndex ? 'active' : ''}>{value}</li>
              ))
            }
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock;
