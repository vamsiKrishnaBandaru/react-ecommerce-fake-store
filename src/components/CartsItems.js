import React, { Component } from 'react'
import axios from 'axios'
import Loader from './Loader'
import NoProducts from './NoProducts';

class CartsItems extends Component {
   constructor(props) {
      super(props);
      this.state = {
         SingleProduct: '',
         fetchError: false,
         loading: true,
         showNoProducts: false,
         errorMessage: ''
      }
   }

   componentDidMount() {
      axios.get(`https://fakestoreapi.com/products/${this.props.productId}`)
         .then((response) => {
            let data = response.data
            if (data === "") {
               this.setState({
                  showNoProducts: true,
                  loading: false
               })

            } else {
               this.setState({
                  SingleProduct: data,
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
               errorMessage: message
            })
         });
   }
   render() {
      let product = this.state.SingleProduct
      return (
         <>
            {
               this.state.loading && <Loader />
            }

            {
               !this.state.loading && Object.keys(product).includes('title') === true &&
               <div className='CartItem'>
                  <div>
                     <img src={product.image}></img>
                  </div>
                  <div className='content'>
                     <h3 className="title">{product.title}</h3>
                     <p>{product.description.slice(0, 75)}...</p>
                     <div className="rating">{product.rating.rate}({product.rating.count})</div>
                     <div className="price">${product.price}</div>
                     <h3>Quantity: {this.props.quantity}</h3>
                  </div>
               </div>
            }

            {
               this.state.showNoProducts === true &&
               this.state.loading === false &&
               <NoProducts />
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
}

export default CartsItems