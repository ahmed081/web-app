import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Import your Redux store

import HomePage from './pages/HomePage'; // Example page
import DashboardPage from './pages/DashboardPage';
import WebReceiver from "./pages/WebReceiver.tsx"; // Example page

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/web-receiver" element={<WebReceiver />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
