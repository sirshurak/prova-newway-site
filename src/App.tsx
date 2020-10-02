import React from 'react'; 
import AppComponent from './components'
import { Provider } from 'react-redux';
import store from './store';

const App = () => <Provider store={store}><AppComponent/></Provider>

export default App;
