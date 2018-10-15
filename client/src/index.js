import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import product from "./module/product";
import "./index.css";
import "../semantic/dist/semantic.min.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter >
	<Switch>
	    <Route exact path="/" component={App}/>
	    <Route path="/product/:id" component={product}/>
    </Switch>
  </BrowserRouter>),
  document.getElementById("root") // eslint-disable-line no-undef
);
