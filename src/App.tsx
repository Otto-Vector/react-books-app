import React from 'react';
import './App.scss';
import {UiComponent} from "./ui/ui";
import store from "./redux/redux-store";
import {Provider} from "react-redux";


const App : React.FC = () => {

  return (
    <Provider store={store}>
    <div className="container">
        <UiComponent />
    </div>
    </Provider>
  );
}

export default App;
