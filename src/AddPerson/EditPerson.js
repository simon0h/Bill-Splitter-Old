import React, { useState } from "react";
import "../Style.css";

const EditPerson = (props) => {
	const [newName, setNewName] = useState(props.name);
	const [newPrice, setNewPrice] = useState(props.price);

	const editPersonDoneHandler = () => {
		props.editPersonHandler();
	}

	const personNameChangeHandler = (event) => {
		setNewName(event.target.value);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		props.editPerson(props.id, newName);
		editPersonDoneHandler();
	}

	const removePersonHandler = () => {
		props.removePersonHandler();
	}

	return (
    	<li>
	    	<form onSubmit = {submitHandler}>
	    		<div className = "Person">
	    			<div>
		    			<input
		      				type = "text"
		      				value = {newName}
		      				onChange = {personNameChangeHandler}
		      			/>
	      			</div>
	    		</div>
	    		<div className = "saveChangeButton">
	    			<button type = "submit">Save</button>
	    		</div>
	    		<div className = "cancelChangeButton">
	    			<button onClick = {editPersonDoneHandler}>Cancel</button>
	    		</div>
	    		<div className = "removeSomethingButton">
	    			<button onClick = {removePersonHandler}>Remove Person</button>
	    		</div>
	    	</form>
    	</li>
  	);
}

export default EditPerson;