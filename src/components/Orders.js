import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Row, Col ,Card ,Button,Container} from 'react-bootstrap'


 export default function Orders({orderProps}) {
  const {
    name,
    price,
    productId,
    quantity,
    description,
  } = orderProps;
  const [quantityOrder, setQuantityOrder] =useState(0)
  const [total, setTotal] = useState(0)

  const addButton =()=>{
    setQuantityOrder(quantity + 1)

  }

  const totalAmount = price * quantity;
  return (
   
    <Container>
     <div className="card-container">
      <Row  className="text-center">
       <Col >
       <Card className="card">
            
            <Card.Body >
              <Card.Title><h1>{name}</h1></Card.Title>
              <Card.Text>
              <p>{description}</p>
              <p>Price: {price}</p>
              <p>Quantity: {quantity}</p>
              </Card.Text>
              <small>Total ₱{totalAmount}</small><br/>
              {/* <Button onClick={()=> addButton(quantity)}>-</Button>
              <Link to={`/product/${productId}`}> <Button variant="primary">Check Out</Button> </Link>
              <Button onClick={()=> addButton(quantity)}>+</Button> */}
            </Card.Body>
          </Card>
       </Col>
     </Row>
     </div>
      </Container>
  
   
  );
}
 