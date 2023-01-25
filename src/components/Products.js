import React from "react";

class Products extends React.Component {
   render() {
      return (
         <>
            <p className="category">{this.props.category}</p>
            <img src={this.props.image}></img>
            <h4 className="title">{this.props.title}</h4>
            <p>{this.props.description.slice(0, 75)}...</p>
            <div className="rating">{this.props.rate}({this.props.count})</div>
            <div className="price">${this.props.price}</div>
            <button className="AddtoCart"> <i className="fa fa-shopping-cart" /> Add to cart</button>
         </>
      );
   }
}

export default Products;
