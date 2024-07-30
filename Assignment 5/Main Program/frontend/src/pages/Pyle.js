import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Pyle() {
  const navigate = useNavigate();

  useEffect(() => {

    const handleClick = () => {
      navigate('/create');
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [navigate]); 

  return (
    <div>
      {}
      <h1>Click anywhere to go to /create</h1>
    </div>
  );
}

export default Pyle;