import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Components from '../components';

const FrontendRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Components />} />
                </Routes>
            </Router>
        </>
    );
}

export default FrontendRoutes;
