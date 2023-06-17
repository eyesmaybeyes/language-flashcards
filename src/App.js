import './App.scss';
import './components/Header/Header.scss';
import './components/Footer/Footer.scss';
import { WriteLocalStorageData } from './utils/LocalStorageSaver.js';
import { Header } from './components/Header/Header.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { Table } from './components/Table/Table.jsx';

function App() {

    WriteLocalStorageData();

    return (
        <div className="App">
            <Header></Header>
            <div className="container">
                <Table></Table>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App;

