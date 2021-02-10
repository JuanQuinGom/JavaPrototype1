import React,{Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Hola from './Hola.js';
import Nav from './components/nav/Nav';
import Header from './components/header/Header';
import Container from './components/container/articles/Container';
function App() {
  return (
    <Fragment>
    <Nav />
    <Header />
    <Container />
    </Fragment>
    
  );
}

export default App;
