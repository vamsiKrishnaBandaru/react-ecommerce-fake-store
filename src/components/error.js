import React from "react";

class Error extends React.Component {
   render() {
      return (
         <div className="error-message">
            {this.props.error}
         </div>
      );
   }
}

export default Error;