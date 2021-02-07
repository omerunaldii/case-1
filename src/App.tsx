import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { ContactUs, Home } from './pages';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/contact-us" name="Contact Us">
            <ContactUs />
          </Route>
          <Route path="/" name="Home">
            <Home />
          </Route>
        </Switch>
      </div>
      <Footer/>
    </Router>
  )
}

export default App;