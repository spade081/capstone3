// import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import { Row, Col,Container} from "react-bootstrap";
import UserCart from "../components/UserCart";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function CartPage() {
  const history = useHistory();
  const [cartList, setCartList] = useState([]);
  const [cartListTotal, setCartListTotal] = useState(0);

  const fetchCartList = () => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartList(data);
      });
  };

  const fetchCartListTotal = () => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/user-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCartListTotal(data.totalAmount);
      });
  };
  useEffect(() => {
    fetchCartList();
    fetchCartListTotal();
  }, []);

  const orderAll = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/order-all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Yeeeyyy!!!",
          icon: "success",
          text: "You have successfully checked out your items",
        });
        history.push("/product");
      })
      .catch((err) => {
        Swal.fire({
          title: "Oppsss!!!",
          icon: "error",
          text: err.message,
        });
      });
  };

  return (
    <div className="mb-5 mt-2">
      <UserCart
        cartData={cartList}
        fetchCartList={fetchCartList}
        fetchCartListTotal={fetchCartListTotal}
      />
  <Container >
              <div className="cartpage-checkout-wrapper">   
       
                    
                  
                          <h1 className="cartpage-summary-text">Order Summary</h1>
                      

                              <h3>
                                Subtotal ({cartList.length}{" "}
                                {cartList.length < 2 ? "item" : "items"})
                              </h3>
                              <span className="cartpage-price">
                                &#8369; {cartListTotal.toLocaleString()}.00
                              </span>
                                    
                          
                          
                                <p className="cartpage-total">Total</p>
                                <span className="cartpage-total">
                                  &#8369; {cartListTotal.toLocaleString()}.00
                                </span>
                        
                          
                            <button className="cartpage-btn" onClick={() => orderAll()}>
                              Proceed to Checkout
                            </button>

                
              
              </div>
             </Container>

     
      
    </div>
  );
}