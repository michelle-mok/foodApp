import React from 'react';
import { FoodAppProvider } from './store';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Messaging from './components/Messaging.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import FooterNavbar from './components/FooterNavbar';
import Location from './components/Location.jsx';



function App() {
  return (
    <FoodAppProvider>
      <div className="App">
        <div className="mobileView">
          <Location />
          {/* <Messaging /> */}
          <FooterNavbar />
        </div>
      </div>
    </FoodAppProvider>
  );
}

export default App;
