function Categories({value, onClickCategory}) {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ];

  // const onClickCategory = (currentIndex) => {
  //   setActiveIndex(currentIndex);
  // }

  // если нам не нужен родитель мы можем передать <></> - фрагмент или <Fragment></Fragment> 
  // если в список элементов не передать атрибут key, то возможно будут ошибки, а также снизится производительность
  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryValue, index) => (
        <li key={index} onClick={() => onClickCategory(index)} className={value === index ? 'active' : ''}>{categoryValue}</li>
        ))
        }
      </ul>
    </div>
  )
}

export default Categories;
