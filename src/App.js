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
      AllProducts: [],
      errorMessage: ''
    }
  }

  FetchData = () => {
    this.setState({
      loading: true,
      fetchError: false,
    })

    axios.get('https://fakestoreapi.com/products')
      .then((response) => {

        let data = response.data
        if (data == null || !Array.isArray(data)) {

          this.setState({
            fetchError: true,
            loading: false,
            errorMessage: 'Failed to load products'
          })

        } else {
          this.setState({
            AllProducts: response.data,
            loading: false
          })
        }

      })

      .catch((error) => {
        let message = ''

        if (error.request) {
          message = "Failed to load: No response was received"
        } else {
          message = "This page didn't load: Fetching from the API is failed."
        }

        this.setState({
          fetchError: true,
          loading: false,
          errorMessage: message
        })
      });
  }

  render() {
    return (
      <div className="App">
        <Header />

        {
          this.state.loading && <Loader />
        }

        <div className="main">
          <ul>
            {
              this.state.AllProducts.map((product) => {
                return (
                  <Products
                    key={product.id}
                    category={product.category}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                    rate={product.rating.rate}
                    count={product.rating.count}
                    price={product.price}
                  />
                )
              })
            }
          </ul>
        </div>

        {
          !this.state.loading &&
          this.state.fetchError &&
          (
            <div className="error-message">
              <i className="fa fa-exclamation-circle"></i>
              <h2>Oops! Something went wrong</h2>
              <h5>{this.state.errorMessage}</h5>
            </div>
          )
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
