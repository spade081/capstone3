import React,{useState, useEffect, useContext, Fragment} from 'react'

import {Form, Button} from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'

export default function Login(){
	//consume the UserContext object in the Login page via useContext()
	//useContext is a react hook used to unwrap our context. It will return the data passed as values by a provider(UserContext.Provider component in App.js)
	const {user, setUser} = useContext(UserContext)
	const history = useHistory();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginButton, setLoginButton] = useState(false)


useEffect(()=>{
	if(email !== "" &&  password !== ""){	
			setLoginButton(true)
		}else{
			setLoginButton(false)

		}


	},[email, password])

function loginUser(e){
	
	e.preventDefault()
	


	
			fetch(`${ process.env.REACT_APP_API_URL }/users/login`, {
				method:'POST',
				headers:{
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password:password

				})
			})
			.then(response => response.json())
			.then(data=>{
				console.log(data)
				//let's set our function in login page
				if(data.accessToken !== undefined){
					localStorage.setItem('accessToken', data.accessToken);
					setUser({accessToken: data.accessToken})
					Swal.fire({
						tite: 'Yeeees',
						icon:'success',
						text:'Thank you for Logging in to zuitt booking'
					})
					//fetch user's details from our token
					fetch(`${ process.env.REACT_APP_API_URL }/users/profile`,{
						headers:{
							'Content-Type': 'application/json',
							Authorization: `Bearer ${data.accessToken}`
						}

					})
					.then(res => res.json())
					.then(result =>{
						console.log(result)
			
					
						if(result.isAdmin === true){
							localStorage.setItem('email', result.email)
							localStorage.setItem('isAdmin',result.isAdmin)
							setUser({
								email: result.email,
								isAdmin:result.isAdmin
							})
						
							history.push('/product')

						}else{
							localStorage.setItem('email', result.email)
							setUser({
								email: result.email							
							})
							history.push('/')
						}
					})



				}else{
					Swal.fire({
						title:'Oooops',
						icon:'error',
						text: 'Something Went Wrong. Check Your Credentials'
					})
				}
					setEmail('')
					setPassword('')

			})
	
	

 }

 if(user.email !== null){
	 return<Redirect to="/" />
 }


	return(
		<Fragment>
		<h1>Login</h1>
			<Form onSubmit={e=>loginUser(e)}>
				

				<Form.Group>
					<Form.Label>Email:</Form.Label>
					<Form.Control type="text" placeholder="Enter Email:"  value={email} onChange={e=> setEmail(e.target.value)} required/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control type="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)} required/>
				</Form.Group>
				{loginButton ?
						<Button variant="primary" type="submit">Submit</Button>
						:
						<Button variant="primary" type="submit" disabled>Submit</Button>
				}
 			</Form>
		</Fragment>
		)
}
