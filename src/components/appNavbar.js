import React, {Fragment, useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import{Link, NavLink,  useHistory} from 'react-router-dom'
import UserContextReg from '../UserContext'
import { Route, Switch } from 'react-router-dom';
// import PageNotFound from '../pages/PageNotFound'
import UserContext from '../UserContext'


export default function AppNavbar(){
    const history = useHistory();
    const{user, unsetUser} = useContext(UserContext)
    const{userReg, unsetUserReg} = useContext(UserContextReg)
    console.log(userReg)
    console.log(user)

    const logout = ()=>{
        unsetUser();
     
        history.push('/login')
      
    }
    const register = ()=>{
        unsetUserReg()
        history.push('/login')
    }

    let rightNav = (user.email !== null) ?
    (   
         <>
             <Nav.Link onClick={logout}>Logout</Nav.Link>
             <Nav.Link as={NavLink} to="/order" >My Order</Nav.Link>
          
        </>


    )

    :
    (
        <>
           <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
         <Nav.Link as={NavLink} to="/register">Register</Nav.Link>

          
         
        </>
         
    )

    return(
        <Fragment>
    
     
      <Navbar bg="light" expand="lg">
          <Navbar.Brand as={Link} to="/">
             Pinto Cakes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                  <Nav.Link as={NavLink} to="product">Products</Nav.Link>                 
                          
              </Nav>
              <Nav className="ml-auto">
            
              </Nav>
              <Nav className="ml-auto">
                    {rightNav}
                </Nav>
          </Navbar.Collapse>
      </Navbar>
      </Fragment>
  )
}



