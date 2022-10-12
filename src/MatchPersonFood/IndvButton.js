import React, { useState } from "react";
import './buttonColor.css';

const IndvButton = (props) => {
	const[buttonColor, setButtonColor] = useState(props.buttonColor);
	const[selectionState, setSelectionState] = useState(props.selectionState);

	const onPersonSelection = (event) => {
		if (!selectionState) {
			setButtonColor("selected");
			props.addPersonWhoAte(props.id);
		}
		else {
			setButtonColor("notSelected");
			props.removePersonWhoAte(props.id);
		}
		setSelectionState(!selectionState);
	}

	return (
		<div className = {buttonColor}>
	  		<button onClick = {onPersonSelection}>{props.name}</button>
	    </div>
    );
}

export default IndvButton;