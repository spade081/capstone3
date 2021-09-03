import React, {useState, useEffect, useContext} from 'react';
import { Redirect,useHistory } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import UserContextReg from '../UserContext'
import Swal from 'sweetalert2'

export default function Register(){
	const history = useHistory();
	const [email, setEmail] = useState("")
	const [password, setPassword] =useState("")
	const [firstName, setFirtName] = useState("")
	const [lastName, setLastName] = useState("")

	const [verifyPassword, setVerifyPassword] = useState("")
	const [registerButton, setRegisterButton] = useState(false)
	const {user, setUser} = useContext(UserContextReg)

	useEffect(()=>{
		if(firstName !== '' && lastName !==''  && email !== '' && password !== '' && verifyPassword !== '' && password === verifyPassword){
			setRegisterButton(true)
		}else{
			setRegisterButton(false)

		}


	},[firstName, lastName, email, password, verifyPassword, registerButton])
	function registerUser(e){
		e.preventDefault()
		fetch(`${ process.env.REACT_APP_API_URL }/users/register`,{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,			
				email: email,
				password:password

			})

		})
		.then(res=> res.json())
		.then(result=>{
			if(result === true){
			
			
				Swal.fire({
					title: 'Yeeees',
					icon:'success',
					text:'yehey thank you for your register'
				})
				history.push('/login')

			 }else{
				fetch(`${ process.env.REACT_APP_API_URL }/users/register`,{
					method: 'POST',
					headers:{
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,			
						email: email,
						password:password
		
					})
		
				})
				.then(res=> res.json())
				.then(res=>{
					if(result === false){
						Swal.fire({
							title:'Oooops',
							icon:'error',
							text: 'Something Went Wrong. Email Already Exist'
						})
					}
				})						
			 }
	
			 setFirtName('')
			 setLastName('')
			 setEmail('')
			 setPassword('')
			 setVerifyPassword('')

		})
	
	
	

	
	

	if(user.email !== null){
		return<Redirect to="/" />
	 }
	}
	return(
		<>
			<h1>Register</h1>
			<Form onSubmit={e=> registerUser(e)}>
			<Form.Group>
					<Form.Label>First Name:</Form.Label>
					<Form.Control type="text" placeholder="Enter First Name:"  value={firstName} onChange={e=> setFirtName(e.target.value)} required/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Last Name:</Form.Label>
					<Form.Control type="text" placeholder="Last Name:"  value={lastName} onChange={e=> setLastName(e.target.value)} required/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Email Address:</Form.Label>
					<Form.Control type="email" placeholder="Enter Email" value={email} onChange={e=> setEmail(e.target.value)}required/>

					<Form.Text className="text-muted">
						<p>We'll never share your email with anyone else</p>
					</Form.Text>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control type="password" placeholder="Password" value={password} onChange={e=> setPassword(e.target.value)}required/>				
				</Form.Group>

				<Form.Group>
					<Form.Label>Verify Password:</Form.Label>
					<Form.Control type="password" placeholder="Verify Password" value={verifyPassword} onChange={e=> setVerifyPassword(e.target.value)}required/>
				</Form.Group>

				{registerButton ?
						<Button variant="primary" type="submit" >Submit</Button>
						:
						<Button variant="primary" type="submit" disabled>Submit</Button>
				}
			
				


			</Form>
		</>
		)
}