import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './navbar/Header';
import Edituser from './EditUser/Edituser';
import Footer from './navbar/Footer';

function App() {
  return (
    <div >
        <Header/>
        <Edituser/>
        <Footer/>
    </div>
  );
}

export default App;
