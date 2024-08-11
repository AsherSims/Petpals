import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home';
import { ROUTES } from './RouterConfig';
import PetPage from '../pages/PetPage/PetPage';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Admin from '../pages/Admin/Admin';

const Router = () => {

    const RouteWithRole = ({ Element }) => {
        return (
          <>
            <Element/>
          </>
        );
      }

  return (
    <div>
        <Routes>
            <Route exact path={ROUTES.Register} element={<Register />}></Route>
            <Route exact path={ROUTES.Login} element={<Login />}></Route>
            <Route exact path={ROUTES.Home} element={<RouteWithRole Element={Home} />}></Route>
            <Route exact path={ROUTES.PetPage} element={<RouteWithRole Element={PetPage} />}></Route>
            <Route exact path={ROUTES.Contact} element={<RouteWithRole Element={Contact} />}></Route>
            <Route exact path={ROUTES.Admin} element={<RouteWithRole Element={Admin} />}></Route>

        </Routes>
    </div>
  )
}

export default Router