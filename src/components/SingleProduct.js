import React, { Component } from 'react'
import axios from "axios";
import Loader from './Loader';
import NoProducts from './NoProducts';

class SingleProduct extends Component {
   constructor(props) {
      super(props);
      this.state = {
         SingleProduct: '',
         fetchError: false,
         loading: true,
         showNoProducts: false,
         AllProducts: [],
         errorMessage: ''
      }
   }

   componentDidMount() {
      axios.get(`https://fakestoreapi.com/products/${this.props.match.params.id}`)
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
               loading: false,
               showNoProducts: true,
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
               < div className='singleProduct'>
                  <div>
                     <img src={product.image}></img>
                  </div>
                  <div className='content'>
                     <h3 className="title">{product.title}</h3>
                     <p>{product.description}</p>
                     <div className="rating">{product.rating.rate}({product.rating.count})</div>
                     <div className="price">${product.price}</div>
                     <button className="AddtoCart"> <i className="fa fa-shopping-cart" /> Add to cart</button>
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
                     <h5>{this.state.errorMessage}nope</h5>
                  </div>
               )
            }
         </>
      )
   }
}

export default SingleProduct