import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="notfound" role="main" aria-labelledby="notfound-title">
            <div className="notfound__container">
                <h1 id="notfound-title" className="notfound__code">404</h1>
                <h2 className="notfound__title">Page not found</h2>
                <p className="notfound__message">
                    Sorry — the page you are looking for does not exist.
                </p>
                <div className="notfound__actions">
                    <button
                        type="button"
                        className="notfound__btn"
                        onClick={() => navigate(-1)}
                    >
                        Go back
                    </button>
                    <Link to="/" className="notfound__link">
                        Go to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default NotFound;