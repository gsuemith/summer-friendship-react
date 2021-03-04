import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import AccountNav from './components/AccountNav'

import Home from './views/Home'
import Register from './views/CreateAccount'
import Login from './views/Login'

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <AccountNav />
      <Switch>
        <Route path="/account/create">
          <Register/>
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
