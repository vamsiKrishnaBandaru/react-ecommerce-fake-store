import React, { Component } from 'react'
import axios from "axios";
import Loader from './Loader';
import Products from "./Products"
import { Link } from 'react-router-dom';

class SingleProduct extends Component {
   constructor(props) {
      super(props);
      this.state = {
         SingleProduct: '',
         fetchError: false,
         loading: true,
         AllProducts: [],
         errorMessage: ''
      }
   }
   componentDidMount() {
      axios.get(`https://fakestoreapi.com/products/${this.props.match.params.id}`)
         .then((response) => {

            let data = response.data
            if (typeof data !== undefined || data.length !== 0) {
               this.setState({
                  SingleProduct: response.data,
                  loading: false
               })

            } else {
               this.setState({
                  fetchError: true,
                  loading: false,
                  errorMessage: 'No product found'
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
      let product = this.state.SingleProduct
      return (
         <>
            {
               this.state.loading && <Loader />
            }

            {
               !this.state.loading &&
               <div className='singleProduct'>
                  <div>
                     <img src={product.image}></img>
                  </div>
                  <div className='content'>
                     <h3 className="title">{product.title}</h3>
                     <p>{product.description}</p>
                     <div className="rating">{product.rating.rate}({product.rating.rate})</div>
                     <div className="price">${product.price}</div>
                     <button className="AddtoCart"> <i className="fa fa-shopping-cart" /> Add to cart</button>
                  </div>
               </div>

            }

            {
               !this.state.loading &&
               this.state.fetchError &&
               (
                  <div className="error-message">
                     <h5>{this.state.errorMessage}</h5>
                  </div>
               )
            }
         </>
      )
   }
}

export default SingleProduct