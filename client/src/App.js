import React, { Component } from "react";
import { Route , Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map" ; 
import Main from "./components/Main" ; 
import Client from "./components/Client" ; 

class App extends Component {
  state = {};


  render() {
    return (
        <>
            <Switch>
                <Route path="/map" component={Map} />
                <Route path="/client" component={Client} />
                <Route path="/" component={Main} />
            </Switch>
        </>

    );
  }
}

export default App;

//view-source:https://getbootstrap.com/docs/4.1/examples/starter-template/#