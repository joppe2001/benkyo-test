import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/molecules/MainMenu/Menu';
import Login from './views/login/Login';
import ServerGrid from './views/serverGrid/serverGrid';

const App = () => {
  return (
    <Router id="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/serverGrid" element={<ServerGrid />} />
      </Routes>
    </Router>
  );
};

export default App;
