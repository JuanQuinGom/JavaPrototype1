import React,{Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import Hola from './Hola.js';
import Nav from './components/nav/Nav';
import Header from './components/header/Header';
import Container from './components/container/articles/Container';
import Article01 from './components/container/articles/Articles01';
import Footer from './components/footer/Footer.js';
function App() {
  return (
    <Fragment>
    <Nav />
    <Header />
    <Container />
    <Footer />
    </Fragment>
    
  );
}

export default App;
