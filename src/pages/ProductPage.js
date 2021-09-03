import React, { useState, useEffect, useContext } from 'react';
//bootstrap
import{Container} from 'react-bootstrap';
import UserContext from '../UserContext';
//components
import AdminView from '../components/AdminView';
import UserView from '../components/UserView'

export default function ProductPage(){
	const{user} = useContext(UserContext)
	const [allProducts, setAllProducts] = useState([])

	const fetchData  = ()=>{
		fetch(`${ process.env.REACT_APP_API_URL }/products/all`,{		
            headers:{
				'Content-Type': 'application/json',
                Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
            }
        })
        
		.then(res=> res.json())

		.then(data =>{
			console.log(data)
			setAllProducts(data)
		})

	}
	useEffect(()=>{
		fetchData()
	},[])

	return(
		<Container>

	
			 {
				(user.isAdmin === true)?
				<AdminView productData={allProducts} fetchData={fetchData}/>
				:
				<UserView productData={allProducts}/>
				
			} 
		</Container>
	)
}
