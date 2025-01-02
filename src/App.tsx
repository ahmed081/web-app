import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // Import your Redux store

import HomePage from './pages/HomePage'; // Example page
import DashboardPage from './pages/DashboardPage'; // Example page

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
