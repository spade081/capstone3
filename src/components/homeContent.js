import React,{Fragment} from 'react'
import { Row, Col ,Card ,Button,Container} from 'react-bootstrap'
import img2 from '../images/FeaturedCakes2.png'
import productimg1 from '../images/product1.jpg'
import productimg2 from '../images/product2.jpg'
import productimg3 from '../images/product3.jpg'
import { Link } from 'react-router-dom'


export default function HomeContent(){
    return(
<Fragment>
     <div className="cardHiglight">
         <Row>
         <Col lg={6}  md={6} sm={{order: 2}}>
                    <Card className="card text-center mt-5">
                        <Card.Body>
                            <Card.Title>
                            <h1>send love through your</h1>
                            <h1>own tasty little way</h1>
                            </Card.Title>
                            <Card.Text>
                                <p>"It's the little things that make life wonderful"</p>
                            </Card.Text>
                         <Link to="/product"><Button>Shop Now</Button></Link>   
                        </Card.Body>
                    </Card>
        </Col>
                <Col lg={6}  md={6} sm={{order: 1}} >
                    <Card className="card">
                        <Card.Body>
                        
                            <img src={img2} className="img-fluid" alt="Main pic"/>
                        </Card.Body>
                    </Card>
                </Col>

               
        </Row>
    </div>

    <div className="cardHiglight2">
       
                    <Card className="card text-center mt-5">
                        <Card.Body>
                            <Card.Title>
                            <h1>Best <span>Product</span></h1>
                         
                            </Card.Title>
                            <Card.Text>
                                <p>"It's the little things that make life wonderful"</p>
                            </Card.Text>
                         <Link to="/product"><Button>Shop Now</Button></Link>   
                        </Card.Body>
                        
  
               </Card>
                     
<div className="productCake ml-4">
   <Row>
   <Col lg={4} md={4} >
   <Card  className="productContent text-center">
    
    <Card.Body>
    <img src={productimg1} className="img-fluid" alt="product 1 "/>
    <Card.Title>
    <span>(Cute Dog)</span>
        <h2>BENTO CAKE</h2>
    </Card.Title>
      
        <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
        </Card.Text>
   
        
    </Card.Body>
    
</Card> 
   </Col>

   <Col lg={4} md={4} >
   <Card  className="productContent text-center">
    
   <Card.Body>
    <img src={productimg2} className="img-fluid" alt="product 2 "/>
    <Card.Title>
    <span>(Unicorn)</span>
        <h2>BENTO CAKE</h2>
    </Card.Title>
      
        <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
        </Card.Text>
       
    </Card.Body>
    
</Card> 
   </Col>

   <Col lg={4} md={4} >
   <Card  className="productContent text-center">
    
   <Card.Body>
    <img src={productimg3} className="img-fluid" alt="product 3 "/>
    <Card.Title>
    <span>(Cute Cow)</span>
        <h2>BENTO CAKE</h2>
    </Card.Title>
       
      
        <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
        </Card.Text>
     
    </Card.Body>
    
</Card> 
   </Col>
       

   </Row>

  
</div>


  
 </div>
 

       
               
              

       
   
    



</Fragment>
    
       
           
           



       
    )
}