import React from 'react'
import{Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
export default function PageNotFound(){
	return(
		<>
		<Container>
			<h3>Zuitt Booking</h3>
			<h1>PageNotFound</h1>
			<p>Go Back to the <Link to="/">Home</Link></p>
		</Container>
		</>
		)
}