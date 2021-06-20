import { FoodAppProvider } from './store';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
// import Messaging from './components/Messaging.jsx';
import Chat from './components/Chat.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import FooterNavbar from './components/FooterNavbar';
import Location from './components/Location.jsx';
import Criteria from './components/Criteria';
import LoginSignupHeader from './components/LoginSignupHeader';
import Results from './components/Results.jsx';
import RoomList from './components/RoomList.jsx';
import Edit from './components/Edit.jsx';

function App() {

  return (
    <FoodAppProvider>
      <div className="App">
        <Router>
        <div className="mobileView">
          {/* <Switch> */}
          {/* <Location /> */}
          {/* <Messaging /> */}
          {/* <Login /> */}
          {/* <Signup /> */}
          {/* <Criteria /> */}
          <Switch>
          <Route exact path ='/'>
            <LoginSignupHeader />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path='/home'>
            <Criteria />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/chat'> 
            <Chat />
          </Route>
          <Route path='/map'>
            <Location />
          </Route>
          <Route path='/results'>
            <Results />
          </Route >
          <Route path='/chatrooms'>
            <RoomList />
          </Route>
          <Route path='/edit'>
            <Edit />
          </Route>
          </Switch>
          <FooterNavbar />
        </div>
        </Router>
      </div>
    </FoodAppProvider>
  );
}

export default App;

