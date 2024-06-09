import Header from './components/Header'
import { createContext, useState } from 'react';

import './scss/app.scss'
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
// hot-roladed - мгоновенно перезапускает
// если у нас есть в массиве атрибут id то мы должны писать в key именно его а не индекс map(для индекса map желательно чтобы элементы были статичны)
// {window.location.pathname === '/' && <Home/>}
// '/pizzas/:id' - означает любой путь после пицца до первого /
// на главной слеш можно и не указывать
// * - обычно ставится в конечном пути и значит default
// export const SearchContext = createContext();

function App() {
  return (
    // <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='pizza/:id' element={<FullPizza />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    // </SearchContext.Provider>
  );
}

export default App;
