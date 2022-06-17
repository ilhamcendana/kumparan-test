/** Frameworks */
import Routers from './Routers';
/**Libs */
import { ToastContainer } from 'react-toastify';
/** Style */
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
