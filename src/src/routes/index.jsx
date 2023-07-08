import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Components from '../components';
import Home from '../components/Home';

const FrontendRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/user" element={<Components />} />
                </Routes>
            </Router>
        </>
    );
}

export default FrontendRoutes;
