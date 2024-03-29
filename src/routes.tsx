import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/partials/login';
import Products from './pages/products';
import ProductDetails from './pages/products/details';
import history from './store/history';

/**
 * Rotas da aplicação. Toda página acessível deve estar aqui com seu respectivo path.
 */
const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" exact component={Products} />
                <Route path="/products/:id" exact component={ProductDetails} />
                <Route path="/login" exact component={Login} />
            </Switch>
        </Router>
    )
}

export default Routes;