import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import {setupStore} from "./redux/redux-store";


const store = setupStore();

function GitStatApp() {
  return (
      <Provider store={store}>
        <>Hello world</>
      </Provider>
  );
}


export default GitStatApp;
