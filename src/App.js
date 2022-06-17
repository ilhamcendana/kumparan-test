import Layout from 'Components/Layout';
import './App.css';
import Routers from './Routers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routers />
      <ToastContainer />
    </div>
  );
}

export default App;
