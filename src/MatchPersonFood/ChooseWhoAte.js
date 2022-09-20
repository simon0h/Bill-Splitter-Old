import React, { useState } from "react";
import IndvButton from "./IndvButton";

const ChooseWhoAte = (props) => {

	const onButtonSelection = (event) => {
		console.log(event);
	}

	return (
		<ul className = "AllPeople">
	    	{props.people && props.people.map((person) => (
				<IndvButton 
					key = {person.id}
					name = {person.name}
				/>)
	      	)}
	    </ul>
    );
}

export default ChooseWhoAte;