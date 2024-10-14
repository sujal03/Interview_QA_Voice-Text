import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Question from './Question';
import Result from './Result';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/question" element={<Question />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
