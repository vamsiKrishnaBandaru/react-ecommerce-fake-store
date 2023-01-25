import axios from "axios";
import React from "react"
import "../App.css"
import Loader from "./Loader"
import Products from "./Products"
import { Link } from "react-router-dom";

class AllProducts extends React.Component {
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
            if (data === null || !Array.isArray(data)) {

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
         <>
            {
               this.state.loading && <Loader />
            }

            <div className="main">
               <ul>
                  {
                     this.state.AllProducts.map((product) => {
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
         </>
      )
   }
   componentDidMount() {
      this.FetchData()
   }
}

export default AllProducts
