import React,{useState, useEffect} from 'react';
import { Row,Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'




export default function Product({productProp}){
    const {_id,name,description,price} = productProp;
    // console.log(productProp)
    

    return(
        
             <Row>
            <Col>
                <Card>
                    <div className="Product">
                    <Card.Body>
                        <Card.Title>
                            <h1>{name}</h1>
                        </Card.Title>
                        <Card.Text>
                        <h3>{description}</h3>
                        <h6>Price:</h6> 
                        <p>{price}</p>
                        </Card.Text>
                        <Link to={`/product/${_id}`}>Details</Link>
                    </Card.Body>

                    </div>
                   

                    
                </Card>
                
            </Col>
        </Row>

    
       
    )
}

Product.propTypes = {
    product: PropTypes.shape({
        name:PropTypes.string.isRequired,
        description:PropTypes.string.isRequired,
        price:PropTypes.number.isRequired
    })
}