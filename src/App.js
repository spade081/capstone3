import React, {Fragment, useState}  from "react";
import './App.scss';
import './Order.scss';
import './login.scss'
import './Register.scss'
import './CartStyle.scss'

//routing
import { BrowserRouter as Router } from 'react-router-dom';
import {Switch, Route, Redirect} from 'react-router-dom'

//components
import AppNavbar from "./components/appNavbar";
import HomeContent from "./components/homeContent";

//bootstrap
import{Container} from 'react-bootstrap'

//pages
import Home from './pages/homePage'
import Login from './pages/Login'
import ProductPage from "./pages/ProductPage";
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'
import SpecificProduct from './pages/SpecificProduct';
 import OrderPage from './pages/OrderPage';
 import CartPage from './pages/CartPage'

//react context
import UserContext from './UserContext'

function App() {

  const [user, setUser] = useState({
    //getItem() method returns value of the specified storage object item.
    email: localStorage.getItem('email'),
    accessToken: localStorage.getItem('accessToken'),
    isAdmin:localStorage.getItem('isAdmin') === 'true'
  });

//     const [userReg, setUserReg] = useState({
//     email:localStorage.getItem('email')
// })
  const unsetUser = ()=>{
    localStorage.clear();
    setUser({
      email:null,
      accessToken:null,
      isAdmin:null
      
    })
    
  }

  return(
    <Fragment>
      <UserContext.Provider value={{user, setUser,unsetUser}}>

      <Router>
            <AppNavbar/>
            <Container fluid>
                <Switch>
             
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/register">
                             {user.email !== null ? <Redirect to="/" /> : <Register />}
                   </Route>
                  <Route exact path="/product" component={ProductPage} />
                  <Route exact path="/order">
                    {user.email === null ? <Redirect to="/" />:<OrderPage/>}
                  </Route>
                  <Route exact path="/cart">
                    {user.email === null ? <Redirect to="/" />:<CartPage/>}
                  </Route>
                  <Route exact path="/product/:productId" component={SpecificProduct}/>
                  <Route component={PageNotFound} />
                  
                </Switch>

            </Container>
              

            </Router>

      </UserContext.Provider>
            
      
       
    </Fragment>
     
  );
  }
export default App;
