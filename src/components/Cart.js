import React from 'react'
import axios from "axios";
import Loader from './Loader';
import "../App.css"
import CartsItems from './CartsItems';

class Cart extends React.Component {
   constructor(props) {
      super(props);

      this.API_STATES = {
         LOADING: "loading",
         LOADED: "loaded",
         ERROR: "error",
      }

      this.state = {
         AllCartItems: null,
         status: this.API_STATES.LOADING,
         errorMessage: "",
      };

      this.URL = 'https://fakestoreapi.com/carts/1';
   }

   fetchData = (url) => {
      this.setState({
         status: this.API_STATES.LOADING,
      }, () => {
         axios.get(url)
            .then((response) => {
               this.setState({
                  status: this.API_STATES.LOADED,
                  AllCartItems: response.data,
               })
            })
            .catch((error) => {
               this.setState({
                  status: this.API_STATES.ERROR,
                  errorMessage: "An API error occurred. Please try again after few minutes."
               })
            })
      })
   }

   componentDidMount = () => {
      this.fetchData(this.URL)
   }

   reloadData = () => {
      this.fetchData(this.URL)
   }

   render() {
      let AllCartItems = this.state.AllCartItems
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
               this.state.status === this.API_STATES.LOADED && AllCartItems === "" &&
               <div className="error-message">
                  <i className="fa fa-exclamation-circle"></i>
                  <h2>Oops! Something went wrong</h2>
                  <h4>No products available at the moment. Please try again later.</h4>
               </div>
            }

            {
               AllCartItems !== null &&
               this.state.status === this.API_STATES.LOADED &&
               <div className="CartContainer">
                  <ul className='Cart'>
                     {
                        AllCartItems.products.map(product => {
                           return (
                              <li key={product.productId}>
                                 <CartsItems productId={product.productId}
                                    quantity={product.quantity}
                                 />
                              </li>
                           )
                        })

                     }
                  </ul>
               </div>
            }

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

export default Cart;
