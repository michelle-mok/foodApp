import './App.css';
import React from 'react';
import Messaging from './Messaging.jsx';
import { FoodAppProvider } from './store';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <FoodAppProvider>
      <div className="App">
        <Messaging />
      </div>
    </FoodAppProvider>
  );
}

export default App;
