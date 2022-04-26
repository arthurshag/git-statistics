import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";

const store = setupStore()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={"/git-statistics/"}>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

