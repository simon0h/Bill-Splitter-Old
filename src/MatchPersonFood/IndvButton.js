import React, { useState } from "react";
import './buttonColor.css';

const IndvButton = (props) => {
	const[buttonColor, setButtonColor] = useState("notSelected");
	const[selectionState, setSelectionState] = useState("false");

	const onPersonSelection = (event) => {
		setSelectionState(!selectionState);
		if (selectionState) {
			setButtonColor("selected");
			props.addPersonWhoAte(props.id);
		}
		else {
			setButtonColor("notSelected");
			props.removePersonWhoAte(props.id);
		}
	}

	return (
		<div className = {buttonColor}>
	  		<button onClick = {onPersonSelection}>{props.name}</button>
	    </div>
    );
}

export default IndvButton;