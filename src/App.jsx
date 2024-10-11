import React, { useState } from 'react';
import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import Homepage from './Pages/Homepage.jsx';
import Preview from './Pages/Preview.jsx'; // Import the Preview component
import AddSample from './Pages/AddSample.jsx';

var count = 0;

function App() {
    const [accounts, setAccount] = useState([
        { id: 0, email: "jokowidodo@sales.com", password: 123123 }
    ]);

    function addAccount(userEmail, userPassword) {
        count++;
        setAccount((preValue) => [
            ...preValue,
            {
                id: count,
                email: userEmail,
                password: userPassword
            },
        ]);
    }

    return (
        <StrictMode>
            <Router>
                <Routes>
                    <Route path="/" element={<Login listOfAccounts={accounts} />} />
                    <Route path="/register" element={<Register addAccount={addAccount} />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/preview" element={<Preview />} />
                    <Route path="/addSample" element={<AddSample />} />
                    
                </Routes>
            </Router>
        </StrictMode>
    );
}

export default App;
