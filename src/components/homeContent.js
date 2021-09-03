import React,{Fragment} from 'react'
import { Row, Col ,Card ,Button} from 'react-bootstrap'
import img1 from '../images/FeaturedCakesv3.png'
import { Link } from 'react-router-dom'


export default function HomeContent(){
    return(
<Fragment>
     <div className="cardHiglight">
         <Row>
         <Col xs={12} md={6} sm={{order: 2}}>
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
                <Col xs={12} md={6} sm={{order: 1}} >
                    <Card className="card">
                        <Card.Body>
                        
                            <img src={img1} className="img-fluid" alt="Main pic"/>
                        </Card.Body>
                    </Card>
                </Col>

               
        </Row>
    </div>


</Fragment>
    
       
           
           



       
    )
}