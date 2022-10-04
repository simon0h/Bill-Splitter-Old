import React, { useState } from "react";
import "../Style.css";

const EditItem = (props) => {
	const [newName, setNewName] = useState(props.name);
	const [newPrice, setNewPrice] = useState(props.price);

	const editItemDoneHandler = () => {
		props.editItemHandler();
	}

	const itemNameChangeHandler = (event) => {
		setNewName(event.target.value);
	}

	const itemPriceChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Item price cannot be negative");
			setNewPrice("");
		}
		else {
			setNewPrice(Math.floor(event.target.value * 100) / 100); // Truncating past two decimal points
		}
	}

	const submitHandler = (event) => {
		event.preventDefault();
		props.editItem(props.id, newName, newPrice);
		editItemDoneHandler();
	}

	const removeItemHandler = () => {
		props.removeItemHandler();
	}

	return (
    	<li>
	    	<form onSubmit = {submitHandler}>
	    		<div className = "Item">
	    			<div>
		    			<input
		      				type = "text"
		      				value = {newName}
		      				onChange = {itemNameChangeHandler}
		      			/>
	      			</div>
	      			<div>
		      			<input
		      				type = "number"
		      				min = "0.01"
		      				step = "0.01" 
		      				value = {newPrice}
		      				onChange = {itemPriceChangeHandler}
		      			/>
	      			</div>
	    		</div>
	    		<div className = "saveChangeButton">
	    			<button type = "submit">Save</button>
	    		</div>
	    		<div className = "cancelChangeButton">
	    			<button onClick = {editItemDoneHandler}>Cancel</button>
	    		</div>
	    		<div className = "removeSomethingButton">
	    			<button onClick = {removeItemHandler}>Remove Item</button>
	    		</div>
	    	</form>
    	</li>
  	);
}

export default EditItem;