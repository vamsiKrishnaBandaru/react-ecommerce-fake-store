import axios from "axios";
import React from "react"
import "../App.css"
import Loader from "./Loader"
import Products from "./Products"
import { Link } from "react-router-dom";

class AllProducts extends React.Component {
   constructor(props) {
      super(props)

      this.API_STATES = {
         LOADING: "loading",
         LOADED: 'loaded',
         ERROR: 'error',
      }

      this.state = {
         status: this.API_STATES.LOADING,
         products: [],
         errorMessage: ''
      };
      this.URL = 'https://fakestoreapi.com/products'
   }

   FetchData = (url) => {
      this.setState({
         status: this.API_STATES.LOADING,
      }, () => {
         axios.get(url)
            .then((response) => {
               this.setState({
                  status: this.API_STATES.LOADED,
                  products: response.data
               })
            })
            .catch((error) => {
               this.setState({
                  status: this.API_STATES.ERROR,
                  errorMessage: "An API error occurred. Please try again in a few minutes."
               })
            })
      })
   }
   componentDidMount() {
      this.FetchData(this.URL)
   }
   reloadData = () => {
      this.FetchData(this.URL)
   }

   render() {
      let products = this.state.products;
      return (
         <>
            {
               this.state.status === this.API_STATES.LOADING && <Loader />
            }
            {
               this.state.status === this.API_STATES.ERROR &&
               <div className="error-message">
                  <i className="fa fa-exclamation-circle"></i>
                  <h2>Oops! Something went wrong</h2>
                  <h4>{this.state.errorMessage}</h4>
               </div>
            }
            {
               this.state.status === this.API_STATES.LOADED && products.length === 0 &&
               <div className='error'>
                  <i className="fa fa-exclamation-circle"></i>
                  <h2>Oops! Something went wrong</h2>
                  <h4>No products available at the moment. Please try after some time.</h4>
               </div>
            }

            <div className="main">
               <ul>
                  {
                     this.state.status === this.API_STATES.LOADED && products.length > 0 &&
                     products.map((product) => {
                        return (
                           <li key={product.id}>
                              <Link to={`/product/${product.id}`}>
                                 <Products
                                    category={product.category}
                                    image={product.image}
                                    title={product.title}
                                    description={product.description}
                                    rate={product.rating.rate}
                                    count={product.rating.count}
                                    price={product.price}
                                 />
                              </Link>
                           </li>
                        )
                     })

                  }
               </ul>
            </div>
         </>

      )
   }
}

export default AllProducts
