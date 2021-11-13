import logo from './logo.svg';
import './App.css';
import React from 'react';
import Nav from './components/Nav';
import ManageFunds from './components/ManageFunds';
import Trips from './components/Trips';
import { BrowserRouter, Switch, Routes, Route , Navigate} from 'react-router-dom';
import back from './images/back.jpg';


function App() {
  return (


    <BrowserRouter>
      <div style = {{background : back}} className="App">

        <Nav />
 
            <Routes>
            <Route path="/travel-app/" element={<Trips />} />
            <Route path="/travel-app/Trips" element={<Trips />} />
            <Route path="/travel-app/ManageFunds" element={<ManageFunds />} />
          </Routes>
      </div>
    </BrowserRouter>



  );
}

export default App;


