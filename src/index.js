import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Helmet>
            <title>Aurora Enhanced</title>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oxygen" />
            <link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap" rel="stylesheet" />
        </Helmet>

        <body>
            <App/>
        </body>
    </React.StrictMode>
);
