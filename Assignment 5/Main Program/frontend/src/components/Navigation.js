import React from 'react';
import { Link } from 'react-router-dom';



function Navigation() {
  return (
    <nav>
        {}
        <Link to="/">Home</Link>
        <Link to="../library">Library</Link>
        <Link to="../pyle">Pyle</Link>

    </nav>
  );
}

export default Navigation;
