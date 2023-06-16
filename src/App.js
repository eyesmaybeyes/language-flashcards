import './App.scss';
import './components/Header/Header.scss';
import './components/Footer/Footer.scss';
import { Header } from './components/Header/Header.jsx';
import { Footer } from './components/Footer/Footer.jsx';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <div className="container">Какой-то контент</div>
            <Footer></Footer>
        </div>
    );
}

export default App;
