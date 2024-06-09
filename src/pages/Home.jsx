import axios from 'axios';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { setItems, fetchPizzas } from '../redux/slices/PizzaSlice';
import { selectCategoryId, selectSortProperty, selectCurrentPage, selectSearchValue } from '../redux/slices/filterSlice';
import { selectPizzasItems } from '../redux/slices/PizzaSlice';
const Home = () => {
  // const isSearch = useRef(false);
  // const isMounted = useRef(false);
  // const navigate = useNavigate();
  const categoryId = useSelector(selectCategoryId);
  // мы с помощью функции возращаем то что нужно нам
  const sortType = useSelector(selectSortProperty);
  const currentPage = useSelector(selectCurrentPage);
  const searchValue = useSelector(selectSearchValue); 
  const {items, status} = useSelector(selectPizzasItems);
  const dispatch = useDispatch();
  // dispatch хранится в store, но не лучши способ, чтобы его взять, лучше использовать хук


  // const [items, setItems] = useState([]);
  // const [categoryId, setCategoryId] = useState(0);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }
  // const { searchValue } = useContext(SearchContext);
  const getPizzas = async () => {
    // fetch(`https://65e227f9a8583365b317f8e3.mockapi.io/items?${page}&limit=4${category}&sortBy=${sortType}&order=desc${search}`)
    //   .then((res) => {
    //     return res.json();
    //   })//отдает только json
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoading(false);
    window.scrollTo(0, 0);
    //     // лучше всего сдесь применить эту фукнцию поскольку fetch асинхронен
    //   })
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const page = `page=${currentPage}`;
    dispatch(fetchPizzas({ category, search, page, sortType }));
    // axios.get(`https://65e227f9a8583365b317f8e3.mockapi.io/items?${page}&limit=4${category}&sortBy=${sortType}&order=desc${search}`)
    //   .then(resp => {
    //     setItems(resp.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //   });

  }
  useEffect(() => {
    /*  if (!isSearch.current) { */
    getPizzas();
    // }
    // isSearch.current = false;
  },
    [categoryId, sortType, searchValue, currentPage]); // означает при первом рендере (мы можем передать параметре и тогда будет перерендер при обновлении) 
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = parse(window.location.search.substring(1));
  //     const sort = list.find(obj => obj.sortProperty === params.sortProperty);
  //     dispatch(setFilters({ ...params, sort }));
  //     isSearch.current = true;
  //   }
  // }, []);
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const quaryString = stringify({
  //       sortProperty: sortType,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${quaryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, currentPage]);
  const pizzas = items.map((obj) => <Link to={`/pizza/${obj.id}`}><PizzaBlock key={obj.id} {...obj} /></Link>);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  return (
    <div className='container'>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          status === 'loading' ? skeletons :
            pizzas}
      </div>
      <Pagination currentPage onChangePage={onChangePage} />
    </div>
  )
}

export default Home;
