import React, { useState } from "react";
import EditItem from "./EditItem";
import { FaTrash, FaPen } from "react-icons/fa";

import "./indvItem.css"

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
		props.removeItem(props.id, props.price);
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
			<div className = "indvItem">
				<div className = "remove">
					<button onClick = {removeItemHandler}><FaTrash/></button>
				</div>
				<div className = "edit">
					<button onClick = {editItemHandler}><FaPen/></button>
				</div>
				<div className = "name">{props.name}</div>
				<div className = "price">{"$" + props.price}</div>
			</div>
    	</li>
  	);
}

export default Item;