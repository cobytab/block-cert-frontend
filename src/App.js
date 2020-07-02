import React, {useEffect} from "react";
import "./App.css";

// Redux
import { Provider } from "react-redux";
import Store from './app/store';

import Test from './components/TestComponent'

function App() {

  return (
    <Provider store={Store}>
      <div className="App">
        <Test />
      </div>
    </Provider>
  );
}

export default App;
