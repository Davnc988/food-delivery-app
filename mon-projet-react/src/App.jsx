import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home.jsx';
import DateForm from './views/DateForm.jsx';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form" element={<DateForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
