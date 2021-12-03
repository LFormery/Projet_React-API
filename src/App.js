import logo from './logo.svg';
import ProductSearch from './components/ProductSearch';
import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar titre="Application TodoList" />
      </header>
      <ProductSearch />
    </div>
  );
}

export default App;
