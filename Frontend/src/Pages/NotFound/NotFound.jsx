import React from 'react'
import {Link} from 'react-router-dom';
import './NotFound.css'
const NotFound = () => {
    
  return (
    <div>
        
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-message">Page Not Found</h2>
            <p className="not-found-description">
                Sorry, the page you're looking for doesn't exist.
            </p>
            <Link to="/" className="back-home-button">
                Go Back to Home
            </Link>
        </div>
    </div>
  )
}

export default NotFound
