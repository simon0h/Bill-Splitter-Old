import React, { useState } from "react";
import IndvButton from "./IndvButton";

const ChooseWhoAte = (props) => {
	const fillPeople = () => {
		let oldSelectedPeople;
		for (const item of props.itemEatenBy_All) {
			if (item.itemID === props.itemID) {
				oldSelectedPeople = item.peopleID;
			}
		}
		//console.log(props.itemID, oldSelectedPeople);
		return oldSelectedPeople;
	}

	const fillPeopleObject = () => {
		let oldSelectedPeople = {};
		for (const person of selectedPeople) {
			oldSelectedPeople[person] = ["selected", true];
		}
		for (const person of props.people) {
			if (oldSelectedPeople[person.id] === undefined) {
				oldSelectedPeople[person.id] = ["notSelected", false];
			}
		}
		//console.log(props.itemID, oldSelectedPeople);
		return oldSelectedPeople;
	}

	const [selectedPeople, setSelectedPeople] = useState(() => {
		const initialState = fillPeople();
		return initialState;
	});

	const [selectedPeopleObject, setSelectedPeopleObject] = useState(() => {
		const initialState = fillPeopleObject();
		return initialState;
	});

	// const [selectedPeople, setSelectedPeople] = useState([]);

	const addPersonWhoAte = (person) => {
		setSelectedPeople((prevPeople) => {
			return [...prevPeople, person];
		});
	}

	const removePersonWhoAte = (personIDToBeRemoved) => {
		const newList = selectedPeople.filter((personID) => personID !== personIDToBeRemoved);
		setSelectedPeople(newList);
		//props.matchItemEatenBy_All(props.itemID, selectedPeople);
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
						buttonColor = {selectedPeopleObject[person.id][0]}
						selectionState = {selectedPeopleObject[person.id][1]}
					/>)
		      	)}
	      	</form>
	    </ul>
    );
}

export default ChooseWhoAte;