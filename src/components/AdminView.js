import React, {useState, useEffect} from 'react'
//bootstrap
import { Table, Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import productData from '../mock-data/productData'

export default function AdminView(props){
    //Destructure our course data from the props being passed by the parent component
    const{ productData, fetchData } = props
    const[products, setProducts] = useState([])
    //Add State for form in Add Course
    const[name, setName] = useState('')
    const [description, setDescription] =useState('')
    const [price, setPrice] = useState('')

   
    const [productId, setProductId] = useState('');
    const [showAdd, setShowAdd] = useState(false)

  
    const [showEdit, setShowEdit] = useState(false)


    const openAdd = () => setShowAdd(true)
    const closeAdd =() => setShowAdd(false)


    const openEdit = (productId) =>{
        console.log(productId)
        fetch(`${ process.env.REACT_APP_API_URL }/products/getSingleProduct/${productId}`,{
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data =>{
                setProductId(data._id)
                setName(data.name)
                setDescription(data.description)
                setPrice(data.price)
            })
            setShowEdit(true)
        
    }


    const closeEdit =()=>{
        setShowEdit(false)
        setName('')
        setDescription('')
        setPrice(0)
    }



    useEffect(()=>{
        const productArr = productData.map(product =>{
            console.log(product)
            return(
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}

                    </td>
                    <td>
                        <Button variant="primary" size="sm" onClick={()=> openEdit(product._id)}>Update</Button>

                        {
                            product.isActive ?
                            <Button variant="danger" size="sm" onClick={()=>archiveToggle(
                                product._id, product.isActive)}>
                                    Disable
                                </Button>
                                :
                                <Button variant="success" size="sm" onClick={() => activateToggle(product._id, product.isActive)}>
								Enable
							</Button>
                            
                        }
                    </td>
                   
                </tr>
            )
        })
        setProducts(productArr)
    },[productData])
   
    const addProduct = (e) =>{
        e.preventDefault()
        fetch(`${ process.env.REACT_APP_API_URL }/products/addProduct`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })


        })
        .then(res =>res.json())
        .then(data => {
            console.log(data)
            if(data === true){
                fetchData()
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully added'
                })
                setName('')
                setDescription('')
                setPrice(0)
                //close our Modal
                closeAdd()
            }else{
                fetchData();
                Swal.fire({
                    title: 'Something went wrong',
                    icon: 'error',
                    text: 'Please try again'
                })

            }

        })
    }

    const editProduct = (e, productId) =>{
        e.preventDefault()
        fetch(`http://localhost:4000/products/update/${productId}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
        })
        .then(res=> res.json())
        .then(data=>{
            if(data=true){
                fetchData()
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully updated'
                })
                closeEdit()
            }else{
                fetchData()
                Swal.fire({
                    title: 'Something went Wrong',
                    icon: 'error',
                    text: 'Please try Again'
                })
            }

        })
    }

    const archiveToggle = (productId, isActive)=>{
        fetch(`http://localhost:4000/products/archive/${productId}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                isActive: isActive
            })
        })
        .then(res => res.json())
        .then(data =>{
            if(data === true){
                fetchData()
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Course Succesfully unarchived'
                })
            }else{
                fetchData()
                Swal.fire({
                    title:'Somthing went wrong',
                    icon: 'error',
                    text: 'Please Try Again'
                })
               
            }
        })
    }
    const activateToggle = (productId, isActive) => {
		fetch(`http://localhost:4000/products/activate/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true){
				fetchData()
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product Successfuly unarchived'
				})
			}else{
				fetchData()
				Swal.fire({
					title: 'Something went wrong',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		})
	}

    return(
        <>
            <div className="text-center bg-dark py-1 text-white">
                <h2>Admin Dash Board</h2>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" onClick={openAdd}>Add New Product</Button>
                </div>

            </div>
            <Table striped bordered hover responsive >
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Id</th>
                        <th>name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </Table>
            {/*Add modal*/ }
            <Modal show={showAdd} onHide={closeAdd}>
                <Form onSubmit={e => addProduct(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Product Name" required value={name} onChange={e=>setName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e=>setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" placeholder="Enter Price" required value={price} onChange={e=>setPrice(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeAdd}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>



            {/* Edit Modal*/}
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Title" required value={name} onChange={e=>setName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e=>setDescription(e.target.value)}/>
                        </Form.Group>

                        <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" placeholder="Enter Price" required value={price} onChange={e=>setPrice(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}