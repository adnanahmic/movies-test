import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CardsPage from "./pages/CardsPage";
import ListPage from "./pages/ListPage";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-container">
        <Switch>
          <Route exact path="/" component={CardsPage} />
          <Route exact path="/list" component={ListPage} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
