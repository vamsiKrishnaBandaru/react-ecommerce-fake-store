import React, { Component } from 'react'

class SingleProduct extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      console.log(this.props.match.params.id)
      return (
         <h1>SingleProduct</h1>
      )
   }
}

export default SingleProduct