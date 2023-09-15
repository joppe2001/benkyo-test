import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/molecules/MainMenu/Menu';
import Login from './views/login/Login';
import ServerGrid from './views/serverGrid/serverGrid';
import { isLoggedIn } from './firebase/auth';

const App = () => {
  return (
    <Router id="App">
      <Routes>
        {isLoggedIn && <Route path="/login" element={<Login />} />}
        {isLoggedIn && <Route path="/serverGrid" element={<ServerGrid />} />}
        <Route path="/" element={<Menu />} />
      </Routes>
    </Router>
  );
};

export default App;

