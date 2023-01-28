import React, { Component } from 'react'
import axios from 'axios'
import Loader from './Loader'
import NoProducts from './NoProducts';
import { Link } from 'react-router-dom';

class CartsItems extends Component {
   constructor(props) {
      super(props);

      this.API_STATES = {
         LOADING: "loading",
         LOADED: "loaded",
         ERROR: "error",
      }

      this.state = {
         SingleProduct: null,
         status: this.API_STATES.LOADING,
         errorMessage: "",

      };

      this.URL = `https://fakestoreapi.com/products/${this.props.productId}`;
   }

   fetchData = (url) => {
      this.setState({
         status: this.API_STATES.LOADING,
      }, () => {
         axios.get(url)
            .then((response) => {
               this.setState({
                  status: this.API_STATES.LOADED,
                  SingleProduct: response.data,
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

   componentDidMount = () => {
      this.fetchData(this.URL)
   }

   render() {
      let product = this.state.SingleProduct
      return (
         <>
            {
               this.state.status === this.API_STATES.LOADING && <Loader />
            }
            {
               this.state.status === this.API_STATES.ERROR &&
               <div className='error'>
                  <h1>{this.state.errorMessage}</h1>
               </div>
            }

            {
               this.state.status === this.API_STATES.LOADED && product !== null &&
               <div className='error'>
                  <h1>No products available at the moment. Please try after some time</h1>
               </div>
            }

            {
               this.state.status === this.API_STATES.LOADED && product !== null && Object.keys(product).includes('title') === true &&
               <div className='CartItem'>
                  <div>
                     <Link to={`/product/${this.props.productId}`}>
                        <img src={product.image}></img>
                     </Link>
                  </div>
                  <div className='content'>
                     <Link to={`/product/${this.props.productId}`}>
                        <h3 className="title">{product.title}</h3>
                        <p>{product.description.slice(0, 120)}...</p>
                     </Link>
                     <div className="rating">{product.rating.rate}({product.rating.count})</div>
                     <div className="price">${product.price}</div>
                     <h3>Quantity: {this.props.quantity}</h3>
                     <h5 className='totalProductCost'>total = ${product.price * this.props.quantity}</h5>
                  </div>
               </div>
            }

            {
               this.state.showNoProducts &&
               !this.state.loading &&
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