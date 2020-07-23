import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Home from './components/Home';
import Reproductor from './components/Reproductor';
import Navbar from './components/Navbar';
import UnJugador from './components/UnJugador';
import DosJugadores from './components/DosJugadores';

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/unJugador" component= { UnJugador } />
          <Route exact path="/dosJugadores" component= { DosJugadores }/>
          <Route exact path="/reglas" component= { Reproductor }/>
          <Route exact path="/" component={ Home }/>
          <Route path="*" render= {() => <h1>Not Found</h1>} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
