import React from 'react'
import axios from "axios";
import Loader from './Loader';
import "../App.css"
import CartsItems from './CartsItems';

class Cart extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         loading: false,
         fetchError: false,
         errorMessage: '',
         AllCartItems: null,
      }
   }

   FetchData = () => {
      this.setState({
         loading: true,
         fetchError: false,
      })

      axios.get('https://fakestoreapi.com/carts/1')
         .then((response) => {

            let data = response.data
            console.log(data)
            if (data === null || !data) {
               this.setState({
                  fetchError: true,
                  loading: false,
                  errorMessage: 'No cart data available'
               })
            } else {
               this.setState({
                  AllCartItems: response.data,
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

            {!this.state.loading && this.state.AllCartItems !== null &&
               <div className="CartContainer">
                  <ul className='Cart'>
                     {
                        this.state.AllCartItems.products.map(product => {
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
