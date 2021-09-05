import React, {useState, useEffect, useContext} from 'react';
import { Container, Card, Button } from 'react-bootstrap';

import { Link, useHistory ,useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function SpecificProduct(){
    const history = useHistory();
    const { user } = useContext(UserContext)
    const[name, setName] = useState('')
    const[description, setDescription] = useState('')

    const[price, setPrice] = useState(0)
    const [quantity, setQuantity] =useState(1)
    const [total, setTotal] = useState()
    //useParams() contains
    const {productId} = useParams()

    useEffect(()=>{
        fetch(`${ process.env.REACT_APP_API_URL }/users/getSingleProduct/${productId}`)
        .then(res => res.json())
        .then(data =>{
        
            setName(data.name)
            setDescription(data.description)
            setPrice(data.price)
            setTotal(data.price * quantity)
            

        })
    },[])


    const purchase = () => {
        fetch(`${ process.env.REACT_APP_API_URL }/orders/myOrder/${productId}`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                quantity: quantity
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data){
                Swal.fire({
                    title:'Successfully Purchased',
                    icon: 'success',
                    text:'congrats you have successfully Purchased'
                })
                history.push('/product')
            }else if(data.error){
                
                Swal.fire({
                    title:' Error',
                    icon: 'error',
                    text:'Error sa code mo'
                })
            }
           

        })
    }

  

    const  addButton =(quantity, price)=>{
        setQuantity(quantity += 1)
        setTotal(quantity * price)
    }
     const  subButton =(quantity, price)=>{
     
        if(quantity > 1){
            setQuantity(quantity -= 1)
            setTotal(quantity * price)
        }else{
            setQuantity(1)
            setTotal(quantity * price)
        }
    }

    const addToCart = (productId) => {
        console.log(productId)
     
        fetch(`${process.env.REACT_APP_API_URL}/carts/add-cart/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            productQty: quantity
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
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
                text: `You added ${name} to your Cart`,
              });
            }
          })
          .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
      };


    return(
        <Container>
            <Card >
                <Card.Header className="bg-dark text-white text-center"><h4>{name}</h4></Card.Header>
                <Card.Body>
                    <Card.Text>{description}</Card.Text>
                    <h6>Price: Php {price}</h6>
                    <Button onClick={()=> subButton(quantity, price)}>-</Button>
                    <span>{quantity}</span>
                    <Button onClick={()=> addButton(quantity, price)}>+</Button>
                    <h6>Total Amount</h6>
                    <span>{total}</span>
                </Card.Body>
                <Card.Footer>
                    {       
                        user.accessToken !==null ?
                     <>
                         <Button variant="primary" block onClick={() => purchase()}>
                         Purchase
                     </Button>
                     <Button variant="primary" block onClick={() => addToCart(productId)}>
                         Add to Cart
                     </Button>
                     </>
                     :
                     
                   <Button variant="primary"  >
                         <Link className="text-white"  to="/login">Login To to Purchased</Link>
                   </Button>
                    }
               
                </Card.Footer>
            </Card>
        </Container>
    )
}