import React, { useState } from "react";
import EditItem from "./EditItem";

const Item = (props) => {
	const [editItemOn, setEditItemOn] = useState(false);

	const editItem = (id, newName, newPrice) => {
		props.editItem(id, newName, newPrice);
		console.log(newName);
	}

	const editItemHandler = () => {
		setEditItemOn(!editItemOn);
	}

	const removeItemHandler = () => {
		props.removeItem(props.id);
	}

	if (editItemOn) {
		return (
			<EditItem 
				id = {props.id} 
				name = {props.name} 
				price = {props.price} 
				editItem = {props.editItem} 
				editItemHandler = {editItemHandler}
				removeItemHandler = {removeItemHandler}
			/>
		);
	}

 	return (
    	<li>
    		<div className = "Item">
    			<div>{props.name}</div>
    			<div>{props.price}</div>
    		</div>
    		<button onClick = {editItemHandler}>Edit Item</button>
    		<div className = "removeSomethingButton">
    			<button onClick = {removeItemHandler}>Remove Item</button>
    		</div>
    	</li>
  	);
}

export default Item;