// import React, { useState, useEffect } from "react";
import UserOrder from "../components/UserOrders";

// export default function CartPage() {
//   const [orderList, setOrderList] = useState([]);
//   // const[products, setProducts] = useState([])
 
//   // const[name, setName] = useState('')
//   // const [description, setDescription] =useState('')
//   // const [price, setPrice] = useState(0)
//   // const [totalAmount, setTotalAmount] = useState(0)

//   useEffect(() => {
//     fetch("http://localhost:4000/orders/userOrder/${productId}", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setOrderList(data.orderList)
     
        
//       });
//   }, []);

//   return (
//     <div>
//       <UserOrder productData={orderList} />
//     </div>
//   );
// }
