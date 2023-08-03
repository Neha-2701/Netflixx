import './App.css';
import Banner from './Components/Banner';
import Navbar from './Components/Navbar';

import Movies from './Components/Movies'; 
import React from 'react';
import Favourites from './Components/Favourites';
import { Routes, Route } from "react-router-dom";
import {BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
function App() {
  // renderMatches(){
  return (
    <Router>
    <Navbar/>
    <Routes>
    <Route element={[<Banner/>,<Movies/>]}  path='/' />
    <Route exact element={<Favourites/>} path='/fav' />
    </Routes>
     </Router>
  );
  // }
}

export default App;
