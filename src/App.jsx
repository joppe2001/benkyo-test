import './App.scss';
import Login from './components/organisms/login/Login';
import Menu from './components/molecules/MainMenu/Menu';

const App = () => {

  return (
    <div id="App">
    {/* add if statement to check for user login */}
      {/* <Menu /> */}
      <Login />
    </div>
  );
};

export default App;
