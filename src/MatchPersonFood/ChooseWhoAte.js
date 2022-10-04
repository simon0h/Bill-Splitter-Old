import React, { useState } from "react";
import IndvButton from "./IndvButton";

const ChooseWhoAte = (props) => {
	const [selectedPeople, setSelectedPeople] = useState([]);

	const addPersonWhoAte = (person) => {
		setSelectedPeople((prevPeople) => {
			return [...prevPeople, person];
		});
	}

	const removePersonWhoAte = (personIDToBeRemoved) => {
		const newList = selectedPeople.filter((personID) => personID !== personIDToBeRemoved);
		setSelectedPeople(newList);
		props.matchItemEatenBy_All(props.itemID, selectedPeople);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		props.matchItemEatenBy_All(props.itemID, selectedPeople);
	} 

	return (
		<ul className = "AllPeople">
			<form onSubmit = {submitHandler}>
		    	{props.people && props.people.map((person) => (
					<IndvButton 
						key = {person.id}
						id = {person.id}
						name = {person.name}
						addPersonWhoAte = {addPersonWhoAte}
						removePersonWhoAte = {removePersonWhoAte}
					/>)
		      	)}
		      	<div>
	      			<button type = "submit">Save</button>
	      		</div>
	      	</form>
	    </ul>
    );
}

export default ChooseWhoAte;