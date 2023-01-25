import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
   render() {
      return (
         <header>
            <div>
               <Link to="/"><i className="fa fa-shopping-cart"></i>My Cart</Link>
            </div>
            <div className="headerContents">
               <li> <Link to="/"><button>Home</button></Link> </li>
               <li> <Link to="/"><button>Menu</button></Link> </li>
               <li> <Link to="/"><button>Cart</button></Link> </li>
            </div>
            <div>
               <div className="buttons">
                  <button> log in</button>
                  <Link to="/"><button>sign up</button></Link>
               </div>
            </div>
         </header>
      );
   }
}

export default Header;
