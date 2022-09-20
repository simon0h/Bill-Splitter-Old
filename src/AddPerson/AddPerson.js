import React, { useState } from "react";
import '../App.css';

const AddPerson = (props) => {
	const [personName, setPersonName] = useState('');

	const personNameChangeHandler = (event) => {
		setPersonName(event.target.value);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		var autoPersonName = personName;
		if (!personName.trim()) {
			autoPersonName = "Person" + props.personID;
			setPersonName(autoPersonName);
		}
		const newPerson = {
			name: autoPersonName,
			id: props.personID 
		};
		props.setPersonID(props.personID + 1);
		props.onAddPerson(newPerson);
		setPersonName("");
	}

 	return (
    	<div className = "Addperson">
      		<div>Add a new person</div>
      		<form onSubmit = {submitHandler}>
      			<div className = "AddPersonInputField">
	      			<label>Person Name</label>
	      			<input
	      				type = "text"
	      				value = {personName}
	      				onChange = {personNameChangeHandler}
	      				placeholder = {"Person "+ props.personID}
	      			/>
	      		</div>
	      		<div>
	      			<button type = "submit">Add person</button>
	      		</div>
      		</form>
    	</div>
  	);
}

export default AddPerson;