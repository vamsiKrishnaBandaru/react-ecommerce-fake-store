import React from "react";

class Header extends React.Component {
   render() {
      return (
         <header>
            <div>
               <i className="fa fa-shopping-cart"></i>My Cart
            </div>
            <div className="headerContents">
               <li> <a href="index.html"><button>Home</button></a> </li>
               <li> <a href="#"><button>Menu</button></a> </li>
               <li> <a href="users.html"><button>Users</button></a> </li>
            </div>
            <div>
               <div className="buttons">
                  <button> log in</button>
                  <a href="signUp.html"><button>sign up</button></a>
               </div>
            </div>
         </header>
      );
   }
}

export default Header;
