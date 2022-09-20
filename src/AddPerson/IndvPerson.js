import React, { useState } from "react";
import EditPerson from "./EditPerson";

const Person = (props) => {
	const [editPersonOn, setEditPersonOn] = useState(false);

	const editPerson = (id, newName) => {
		props.editPerson(id, newName);
		console.log(newName);
	}

	const editPersonHandler = () => {
		setEditPersonOn(!editPersonOn);
	}

	const removePersonHandler = () => {
		props.removePerson(props.id);
	}

	if (editPersonOn) {
		return (
			<EditPerson 
				id = {props.id} 
				name = {props.name} 
				editPerson = {props.editPerson} 
				editPersonHandler = {editPersonHandler}
				removePersonHandler = {removePersonHandler}
			/>
		);
	}

 	return (
    	<li>
    		<div className = "Person">
    			<div>{props.name}</div>
    		</div>
    		<button onClick = {editPersonHandler}>Edit Person</button>
    		<div className = "removeSomethingButton">
    			<button onClick = {removePersonHandler}>Remove Person</button>
    		</div>
    	</li>
  	);
}

export default Person;