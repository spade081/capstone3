import React from "react";
import { Link } from "react-router-dom";

export default function Orders({ orderProps }) {
  const {
    name,
    price,
    productId,
    quantity,
    description,
  } = orderProps;

  const totalAmount = price * quantity;
  return (
    <div className="card-container">
     
      <div className="body">
        <h5 clasName="product-name">{name}</h5>
        <p className="description">{`${description.substr(
          0,
          50
        )}...`}</p>
        
        <p className="price">₱ {price}</p>
        <small>Total ₱{totalAmount}</small>

        <Link to={`/product/${productId}`}>
          <button className="card-btn">Details</button>
        </Link>
      </div>
    </div>
  );
}