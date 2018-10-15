import React, { Component } from "react";
import Client from "../Client";
import { Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Product extends Component{
	state = {
		id: 0,
		product: {},
		nameError: false,
		brandError: false,
		upc12Error: false,
	}
	constructor(){
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}
	componentWillMount(){
		const { id } = this.props.match.params;
		Client.show(id, product => this.setState({ product, id }))
	}

	handleChange(e, { name, value }){
		let { product } = this.state;
		product = {
			...product,
			[name]:value
		}
		this.setState({ product })
	}

	handleSubmit(){
	    const { product } = this.state;
	    let error = false;
	    if (product.name === '') {
	    	error = true;
	    	this.setState({ nameError: true });
	    }
	    else{
	    	this.setState({ nameError: false });
	    }
	    if (product.brand === '') {
	    	error = true;
	    	this.setState({ brandError: true });
	    }
	    else{
	    	this.setState({ brandError: false });
	    }
	    if (product.upc12 === '' || /\d{12}/.test(product.upc12) === false) {
	    	error = true;
	    	this.setState({ upc12Error: true });
	    }
	    else{
	    	this.setState({ upc12Error: false });
	    }
	    if (error === false) {
		    Client.update(product, d => {
		    	this.props.history.push(`/`)
		    })
	    }
	}

	handleRemove(){
	    const { id } = this.state;
	    
	    Client.remove(id, d => {
	    	this.props.history.push(`/`)
	    })
	}

	render(){
		const { id, product:{ name, brand, upc12 },nameError, brandError, upc12Error } = this.state;
		if (!id) {
			return (<h1>Record not found</h1>);
		}

		return (
		<Form onSubmit={this.handleSubmit}>
		    <Form.Field>
		      <label>Name</label>
		      <Form.Input placeholder='Name'  name='name' required onChange={this.handleChange} value={name} error={nameError}/>
		    </Form.Field>
		    <Form.Field>
		      <label>Brand</label>
		      <Form.Input placeholder='Brand'  name='brand' required onChange={this.handleChange} value={brand} error={brandError}/>
		    </Form.Field>
		    <Form.Field>
		      <label>UPC12</label>
		      <Form.Input placeholder='UPC12' name='upc12' required onChange={this.handleChange} value={upc12} error={upc12Error}/>
		    </Form.Field>
		    <Link to='/' className='ui button' role='button'>Back</Link><Button type='submit'>Submit</Button><Button type='button' onClick={this.handleRemove}>Remove</Button>
		</Form>)
	}
}

export default Product;