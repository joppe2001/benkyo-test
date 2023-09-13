import './App.scss';
import mainNav from './components/pages/Main Menu/menu';
//import Login from './components/organisms/login/Login';

const App = () => {

  return (
    <div id="App">
    {/* add if statement to check for user login */}
      <MainNav />
    </div>
  );
};

export default App;
