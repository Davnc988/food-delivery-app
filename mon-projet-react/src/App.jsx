import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home.jsx';
import DateForm from './views/DateForm.jsx';

function App() {

    return (
        <HashRouter >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<DateForm />} />
            </Routes>
        </HashRouter>
    );
}

export default App
