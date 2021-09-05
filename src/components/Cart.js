import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Row, Col,Container} from "react-bootstrap";

export default function Cart({ cartProps, fetchCartList, fetchCartListTotal }) {
  const history = useHistory();
  const {
    productName,
    productPrice,
    productId,
    productQty,
    productDescription,
  } = cartProps;

  const [editQty, setEditQty] = useState(productQty);
  const [decrementBtn, setDecrementBtn] = useState(false);
  const [totalAmount, setTotalAmount] = useState(editQty * productPrice);

  useEffect(() => {
    if (editQty < 2) {
      setDecrementBtn(true);
      setTotalAmount(editQty * productPrice);
    } else {
      setDecrementBtn(false);
      setTotalAmount(editQty * productPrice);
    }
  }, [editQty, totalAmount]);

  const incrementQty = () => {
    setEditQty(editQty + 1);
    addToCart(1);
  };

  const decrementQty = () => {
    setEditQty(editQty - 1);
    addToCart(-1);
  };

  const addToCart = (quantity) => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/add-cart/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        productQty: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchCartListTotal();
      })
      .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
  };

  const orderProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/myOrder/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        quantity: editQty,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.error) {

          Swal.fire({
            title: "Opps!!!",
            icon: "Error",
            text: "Something went wrong",
          });
        } else {
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "success",
            text: "You have successfully Order",
          });
          history.push("/product");
        }
      })
      .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
  };

  const deleteCart = () => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/delete-cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.notInCart) {
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "success",
            text: `You have successfully removed ${productName}`,
          });
          fetchCartList();
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Oppss!!!",
          icon: "error",
          text: `Something went wrong ${err.message}`,
        });
      });
  };

  return (
    <Container className="cartContainer">

   
    
    <div className="cart-wrapper">
    
      <div className="productCart">
           
           <h2>
           {productName}
           </h2>
           <h3>{`${productDescription.substr(
             0,
             50
           )}...`}</h3>

           <p >₱ {productPrice}</p>

     
    
  

       <div >
     <div>
       <button
         disabled={decrementBtn}
         className="specific-decrement "
         onClick={() => decrementQty()}
       >
         <i class="fas fa-minus"></i>
       </button>
       <span className="m-2">{editQty}</span>
       <button
         className="specific-increment"
         onClick={() => incrementQty()}
       >
         <i class="fas fa-plus"></i>
       </button>
       <span  className="ml-2 delete" > <i onClick={() => deleteCart()} class="fas fa-trash-alt"></i>  </span>
     </div>
     <div className="cart-item-total my-3">
       <small>Total ₱{totalAmount.toLocaleString()}</small>
     </div>

     <button className="cart-btn" onClick={() => orderProduct()}>
       Buy Now
     </button>
   </div>

</div>
        
    </div>
    </Container>
  );
}
