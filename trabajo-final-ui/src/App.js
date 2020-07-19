import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route path="*" render= {() => <h1>Not Found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
