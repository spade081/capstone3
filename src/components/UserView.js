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
                    <Product key={product._id} productProp={product}/>
                )
            }else{
                return null
            }
        })
        //set the products state to the result of our map function, to bring our returned product components outside of the scope of our useEffect where our return statement belo can see.
        setproducts(productArr)
    },[productData])
    
    return(
        <Fragment>
            <Container fluid className="my-4 px-lg-4" >
                <div className="Product-list mx-4npo">
                <Row lg={3} md={3} sm={1} className="my-4 justify-content-center text-center">
                   {products}
                </Row>
                </div>
               
            </Container>
          

           
        </Fragment>

    )
}
