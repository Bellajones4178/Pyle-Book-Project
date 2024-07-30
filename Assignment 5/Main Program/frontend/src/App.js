
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import './App.css';



import HomePage from './pages/HomePage';
import Library from './pages/Library';
import Pyle from './pages/Pyle';

import EditBookTable from './pages/EditBookTable';
import AddBookTable from './pages/AddBookTable';


function App() {

  const [book,setbookToEdit] = useState([])

  return (
    <>
      <BrowserRouter>

      <header className="site-header">
          <img src="Gray-Library-Heading.png" alt="Gray marble library" className="header-image" />
          <div className="header-text">
            <h1>Pyle</h1>
            <p>“Organize your books effortlessly into ‘pyles’, an online organizer for book lovers.”</p>
          </div>
        </header>

          <Navigation />

          <main>
            <section>
                <Routes> 
                    {}
                    
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/pyle" element={<Pyle/>} />
                    <Route path="/library" element={<Library setBook={setbookToEdit} />} />
                    <Route path="/create" element={<AddBookTable />} /> 
                    <Route path="/update" element={<EditBookTable bookToEdit={book} />} /> 

                </Routes>
              </section>
          </main>

          <footer>
            <p>© 2024 Isabella M Jones</p>
          </footer>

      </BrowserRouter>
    </>
  );
}

export default App;