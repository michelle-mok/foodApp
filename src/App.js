import './App.css';
import Messaging from './components/Messaging.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import FooterNavbar from './components/FooterNavbar';

function App() {
  return (
    <div className="App">
      <div className="mobileView">
     <Signup />
     <FooterNavbar />
      </div>
    </div>
  );
}

export default App;
