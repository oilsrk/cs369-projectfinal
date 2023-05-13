import {NavLink, Outlet, useMatch, useResolvedPath } from "react-router-dom" //
import basket from "../img/basket.png"
import userpic from "../img/userpic.png"
import logo from "../img/logo.png"

export default function Navbar() {
  return (
    <div className="container">
      <nav className="nav">
        <img className="logoNav" src={logo}/>
        <NavLink to="/" className="Home">Home</NavLink>
        <NavLink to="/product" className="Product">สินค้า</NavLink>
        <NavLink to="/product" className="Order">การสั่งซื้อ</NavLink>
        <div>
        <NavLink to="/noOrder" className="basket"><img src={basket} className="imgNav" /></NavLink>
        <NavLink to="/user" className="User"><img src={userpic} className="imgNav" /></NavLink>
        </div>
      </nav>
      <div className="container">
        <Outlet /> {/* your content will be shown in the Outlet  */}
       </div>
      
    </div>
    
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <NavLink to={to} {...props}>
        {children}
      </NavLink>
    </li>
  )
}






