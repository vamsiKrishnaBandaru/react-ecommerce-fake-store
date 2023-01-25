import React, { Component } from "react"
import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AllProducts from "./components/AllProducts"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import SingleProduct from "./components/SingleProduct"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div className="App">
            <Header />
            <Route path="/" exact>
              <AllProducts />
            </Route>
            <Route path="/product/:id" exact component={SingleProduct}>
            </Route>
            <Footer />
          </div>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
