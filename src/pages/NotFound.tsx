import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="home-link">
        Go to Palette Generator
      </Link>
    </div>
  );
};

export default NotFound;
