import './App.css';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './components/Product';

function App() {
  return (
    <div className="App row">
      <header className="App-header mb-5">
        <NavBar titre="Application Food EAN"/>
      </header>
      <div className="container-sm">
          <Product />
      </div>
    </div>
  );
}

export default App;
