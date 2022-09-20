import React, { useState } from "react";
import '../App.css';

const AddItem = (props) => {
	const [itemName, setItemName] = useState('');
	const [itemPrice, setItemPrice] = useState(0);

	const itemNameChangeHandler = (event) => {
		setItemName(event.target.value);
	}

	const itemPriceChangeHandler = (event) => {
		if (event.target.value < 0) {
			window.alert("Item price cannot be negative");
			setItemPrice("");
		}
		else {
			setItemPrice(Math.floor(event.target.value * 100) / 100); // Truncating past two decimal points
		}
	}

	const submitHandler = (event) => {
		event.preventDefault();
		var autoItemName = itemName;
		if (!itemName.trim()) {
			autoItemName = "Item" + props.itemID;
			setItemName(autoItemName);
		}
		const newItem = {
			name: autoItemName,
			price: itemPrice,
			id: props.itemID 
		};
		props.setItemID(props.itemID + 1);
		props.onAddItem(newItem);
		setItemPrice(0);
		setItemName("");
	}

 	return (
    	<div className = "AddItem">
      		<div>Add a new item</div>
      		<form onSubmit = {submitHandler}>
      			<div className = "AddItemInputField">
	      			<label>Item Name</label>
	      			<input
	      				type = "text"
	      				value = {itemName}
	      				onChange = {itemNameChangeHandler}
	      				placeholder = {"Item"+props.itemID}
	      			/>
	      		</div>
	      		<div className = "AddItemInputField">
	      			<label>Item Price</label>
	      			<input
	      				type = "number"
	      				min = "0.01"
	      				step="0.01" 
	      				value = {itemPrice}
	      				onChange = {itemPriceChangeHandler}
	      			/>
	      		</div>
	      		<div>
	      			<button type = "submit">Add Item</button>
	      		</div>
      		</form>
    	</div>
  	);
}

export default AddItem;