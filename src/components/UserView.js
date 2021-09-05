import React, {useState, useEffect,Fragment} from 'react';
import Product from './Product';
import { Row,Col,Container } from 'react-bootstrap';

export default function UserView({productData}){
    const [products, setproducts] = useState([])

   

    useEffect(()=>{

       
        const productArr = productData.map(product =>{
            console.log(product)
            //only render active
            if(product.isActive === true){
                return(
 
               <Col sm={10} md={8} lg={6} className="mx-auto "> <Product key={product._id} productProp={product}/> </Col>
               
                )
            }else{
                return null
            }
        })
        //set the products state to the result of our map function, to bring our returned product components outside of the scope of our useEffect where our return statement belo can see.
        setproducts(productArr)
    },[productData])
    
    return(
        <Container>
        <div className="userProduct">
          <Row>
            
         
              {products}
        
                         
          </Row>

        </div>

           
            
        </Container>
       

    )
}
