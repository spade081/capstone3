import React,{useState, useEffect} from 'react';
import { Row,Col, Card, Button ,Container} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'




export default function Product({productProp}){
    const {_id,name,description,price} = productProp;
    // console.log(productProp)
    

    return(

            
                    
                        <Card className="m-3 productInfo">
                
                            <Card.Body>
                                <Card.Title>
                                <h1>{name}</h1>
                                </Card.Title>
                                <Card.Text>
                                <h3>{description}</h3>
                                <h6>Price:</h6> 
                                <p>{price}</p>
                                </Card.Text>
                                <Link to={`/product/${_id}`}><h4>Details</h4></Link>
                            </Card.Body>

                        
                        

                            
                        </Card>
                        
                    
              
             
    
             

    
       
    )
}

Product.propTypes = {
    product: PropTypes.shape({
        name:PropTypes.string.isRequired,
        description:PropTypes.string.isRequired,
        price:PropTypes.number.isRequired
    })
}