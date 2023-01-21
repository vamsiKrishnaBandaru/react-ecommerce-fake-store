import axios from "axios";
import React from "react"
import "./App.css"
import Header from "./components/Header"
import Loader from "./components/Loader"
import Footer from "./components/Footer"
import Products from "./components/Products"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      fetchError: false,
      AllProducts: []
    }
  }

  FetchData = () => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        console.log(response.data)
        this.setState({
          AllProducts: response.data
        })
      })

      .catch(() => {
        console.log('error fetching');
        this.setState({
          fetchError: true,
          loading: false
        })
      });
  }

  render() {
    return (
      <div className="App">
        <Header />


        {
          this.state.AllProducts.map((product) => {
            return (
              <Products
                title={product.title}
              />
            )
          })
        }

        <Footer />
      </div>
    )
  }
  componentDidMount() {
    this.FetchData()
  }
}

export default App
