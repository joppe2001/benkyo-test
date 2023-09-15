import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/molecules/MainMenu/Menu';
import Login from './views/login/Login';

const App = () => {
  return (
    <Router id="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Menu />} />
      </Routes>
    </Router>
  );
};

export default App;

