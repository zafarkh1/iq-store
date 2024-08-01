import {useContext, useEffect, useState} from 'react';
import {Button, Footer, Router, useTheme, Window} from "@iqueue/ui-kit";
import Manufacturers from "./page/manufacturers";
import Products from "./page/products";
import {dataProvider} from "./provider/dataProvider";
import Login from "./page/login";
import {tokenContext} from "./provider/tokenProvider";
import Suppliers from "./page/suppliers";
import Categories from "./page/categories";
import History from "./page/history";
import Users from "./page/users";
import Models from "./page/models";

function App() {
  const {setTheme} = useTheme();
  const {setIsProducts, setIsManufacturers, setIsModels, setIsSuppliers, setIsCategories} = useContext(dataProvider)
  const {setLogin, currentUser, handleLogout, setIsUsers} = useContext(tokenContext)
  const [route, setRoute] = useState('auth');

  useEffect(() => setTheme('dark'), [setTheme]);

  useEffect(() => {
    currentUser.token && setRoute('home')
  }, [currentUser]);

  const navigation = [
    {
      key: 'home',
      route: 'home',
      title: 'Products',
      icon: 'production_quantity_limits'
    },
    ...(currentUser.role === 'Admin' ? [
      {
        key: 'users',
        route: 'users',
        title: 'Users',
        icon: 'account_circle'
      }
    ] : []),
    {
      key: 'manufacturers',
      route: 'manufacturers',
      // title: 'Manufacturers',
      title: 'Manuf-s',
      icon: 'cabin'
    },
    {
      key: 'models',
      route: 'models',
      title: 'Models',
      icon: 'library_books'
    },
    {
      key: 'suppliers',
      route: 'suppliers',
      title: 'Suppliers',
      icon: 'airport_shuttle'
    },
    {
      key: 'categories',
      route: 'categories',
      title: 'Categories',
      icon: 'category'
    },
    {
      key: 'history',
      route: 'history',
      title: 'History',
      icon: 'history'
    }
  ]


  return (
    <Window
      title={'IQ-Store'}
      route={route}
      onNavigate={setRoute}
      paddings={false}
      nav={currentUser.token && navigation}
      extra={
        currentUser.token ? (
          <Button
            primary
            title='Logout'
            onClick={() => {
              handleLogout()
              window.location.reload();
              localStorage.removeItem('products')
            }}
          />
        ) : (
          <Button
            primary
            title='Login'
            onClick={() => setLogin(true)}
          />
        )
      }
      footer={
        <Footer>
          <div className='footer-container'>
            <p>Mobile Solutions &copy; 2024</p>
            {route === 'home' && currentUser.role !== 'Viewer' && (
              <Button
                primary
                onClick={() => setIsProducts(true)}
                title='Add product'
              />
            )}
            {route === 'users' && (
              <Button
                primary
                onClick={() => setIsUsers(true)}
                title='Add users'
              />
            )}
            {route === 'manufacturers' && currentUser.role === 'Admin' && (
              <Button
                primary
                onClick={() => setIsManufacturers(true)}
                title='Add manufacturer'
              />
            )}
            {route === 'models' && currentUser.role === 'Admin' && (
              <Button
                primary
                onClick={() => setIsModels(true)}
                title='Add model'
              />
            )}
            {route === 'suppliers' && (currentUser.role === 'Admin' || currentUser.role === 'Warehouse Manager') && (
              <Button
                primary
                onClick={() => setIsSuppliers(true)}
                title='Add supplier'
              />
            )}
            {route === 'categories' && (currentUser.role === 'Admin' || currentUser.role === 'Purchasing Manager' || currentUser.role === 'Sales Manager') && (
              <Button
                primary
                onClick={() => setIsCategories(true)}
                title='Add category'
              />
            )}
          </div>
        </Footer>
      }
    >
      <Router
        route={route}
        routes={{
          auth: () => <Login/>,
          home: () => currentUser.token && <Products/>,
          users: () => <Users/>,
          manufacturers: () => <Manufacturers/>,
          models: () => <Models/>,
          suppliers: () => <Suppliers/>,
          categories: () => <Categories/>,
          history: () => <History/>
        }}
      />
    </Window>
  );
}

export default App;