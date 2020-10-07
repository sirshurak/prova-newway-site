import React from 'react'; 
import { Provider } from 'react-redux';
import store from './store';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './pages/layout/header';
import Content from './pages/layout/content';
import Footer from './pages/layout/footer';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import { View } from 'react-native';
import  './styles.css';

/**
 * Estrutura do Aplicativo.
 */
const App = () => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Header/>
                <Content>
                    <Routes/>
                </Content>
                <Footer/>
            </AuthProvider>
        </Provider>
    )
}


export default App;
